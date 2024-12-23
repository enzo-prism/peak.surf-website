import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { Redis } from 'ioredis';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Configure the connection pool with retry logic
const createPool = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000, // Increased timeout for initial connection
    maxUses: 7500,
    statement_timeout: 30000,
    keepAlive: true,
    allowExitOnIdle: true,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  // Test database connection
  pool.on('connect', (client) => {
    console.log('New client connected to pool');
    client.on('error', (err) => {
      console.error('Database client error:', err);
    });
  });

  pool.on('error', async (err, client) => {
    console.error('Unexpected error on idle client:', err);
    try {
      await client?.release();
    } catch (e) {
      console.error('Error closing client:', e);
    }
  });

  // Additional monitoring
  pool.on('acquire', () => {
    console.log('Client acquired from pool');
  });

  pool.on('remove', () => {
    console.log('Client removed from pool');
  });

  return pool;
};

// Create the initial pool
const pool = createPool();

// Retry helper function with exponential backoff
const retryWithBackoff = async (operation: () => Promise<any>, retries = 5): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      if (i === retries - 1) throw error;
      
      // Handle specific error cases
      if (error.message?.includes('endpoint is disabled')) {
        console.log('Database is starting up, retrying...');
      } else {
        console.error(`Operation failed (attempt ${i + 1}/${retries}):`, error.message);
      }
      
      // Exponential backoff with jitter
      const delay = Math.min(1000 * Math.pow(2, i), 10000) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Verify the pool is working with retries
(async () => {
  try {
    await retryWithBackoff(async () => {
      const client = await pool.connect();
      try {
        await client.query('SELECT 1'); // Verify we can actually query
        console.log('Database connection verified');
      } finally {
        client.release();
      }
    });
  } catch (err) {
    console.error('All database connection attempts failed:', err);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.error('Continuing in development mode despite database connection failure');
    }
  }
})();

// Redis client for caching with fallback handling
let redis: Redis | null = null;

const initRedis = async () => {
  try {
    if (process.env.REDIS_URL) {
      redis = new Redis(process.env.REDIS_URL, {
        retryStrategy: (times: number) => {
          if (times > 3) {
            console.log('Redis connection failed, running without cache');
            return null;
          }
          return Math.min(times * 100, 3000);
        },
        maxRetriesPerRequest: 3,
        enableOfflineQueue: false,
        lazyConnect: true
      });

      redis.on('error', (err) => {
        console.warn('Redis error, some features may be degraded:', err.message);
        redis = null; // Reset redis client on error
      });

      redis.on('connect', () => {
        console.log('Redis connected successfully');
      });

      // Test Redis connection
      await redis.ping();
    } else {
      console.log('REDIS_URL not provided, running without cache');
    }
  } catch (error) {
    console.warn('Failed to initialize Redis, running without cache:', error);
    redis = null;
  }
};

// Initialize Redis
initRedis();

// Cache middleware with fallback and error handling
export const withCache = async (key: string, ttl: number, getData: () => Promise<any>) => {
  if (!redis) {
    return getData();
  }

  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await getData();
    
    try {
      await redis.setex(key, ttl, JSON.stringify(data));
    } catch (cacheError) {
      console.warn(`Failed to cache data for key: ${key}`, cacheError);
    }
    
    return data;
  } catch (error) {
    console.warn(`Cache error for key: ${key}, falling back to direct query:`, error);
    return getData();
  }
};

// Cache invalidation helper with fallback and error handling
export const invalidateCache = async (key: string) => {
  if (!redis) {
    return;
  }

  try {
    await redis.del(key);
  } catch (error) {
    console.warn(`Failed to invalidate cache for key: ${key}:`, error);
  }
};

// Initialize Drizzle with the pool
export const db = drizzle(pool, {
  logger: process.env.NODE_ENV === 'development',
});

// Export configured instances
export { pool, redis };
