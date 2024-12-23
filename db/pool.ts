import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { Redis } from 'ioredis';

// Configure the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Reduced for better resource management
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
  maxUses: 7500,
  statement_timeout: 10000, // Timeout queries after 10s
  allowExitOnIdle: true
});

// Monitor pool events
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client:', err);
});

pool.on('connect', () => {
  console.log('New client connected to pool');
});

pool.on('acquire', () => {
  console.log('Client acquired from pool');
});

pool.on('remove', () => {
  console.log('Client removed from pool');
});

// Add event listeners for the pool
pool.on('connect', (client) => {
  console.log('New client connected to the pool');
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

// Redis client for caching with fallback handling
let redis: Redis | null = null;
try {
  redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    retryStrategy: (times: number) => {
      if (times > 3) {
        console.log('Redis connection failed, running without cache');
        return null;
      }
      return Math.min(times * 100, 3000);
    },
    maxRetriesPerRequest: 3,
    enableOfflineQueue: false
  });

  redis.on('error', (err) => {
    console.warn('Redis error, some features may be degraded:', err.message);
  });

  redis.on('connect', () => {
    console.log('Redis connected successfully');
  });
} catch (error) {
  console.warn('Failed to initialize Redis, running without cache:', error);
}

// Cache middleware with fallback
export const withCache = async (key: string, ttl: number, getData: () => Promise<any>) => {
  // If Redis is not available, fall back to direct database query
  if (!redis) {
    console.log('Cache disabled, fetching data directly');
    return getData();
  }

  try {
    // Try to get data from cache
    const cachedData = await redis.get(key);
    if (cachedData) {
      console.log(`Cache hit for key: ${key}`);
      return JSON.parse(cachedData);
    }

    console.log(`Cache miss for key: ${key}`);
    // If not in cache, get from database
    const data = await getData();
    
    // Store in cache with error handling
    try {
      await redis.setex(key, ttl, JSON.stringify(data));
      console.log(`Cached data for key: ${key}, TTL: ${ttl}s`);
    } catch (cacheError) {
      console.warn(`Failed to cache data for key: ${key}`, cacheError);
      // Continue execution even if caching fails
    }
    
    return data;
  } catch (error) {
    console.warn(`Cache error for key: ${key}, falling back to direct query:`, error);
    return getData();
  }
};

// Cache invalidation helper with fallback
export const invalidateCache = async (key: string) => {
  if (!redis) {
    console.log('Cache disabled, skipping invalidation');
    return;
  }

  try {
    await redis.del(key);
    console.log(`Cache invalidated for key: ${key}`);
  } catch (error) {
    console.warn(`Failed to invalidate cache for key: ${key}:`, error);
  }
};

export const db = drizzle(pool);
export { pool, redis };
