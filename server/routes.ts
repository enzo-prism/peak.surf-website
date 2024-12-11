import { type Express } from "express";
import { createServer } from "http";
import { setupAuth } from "./auth";
import { db } from "../db";
import { sessions, surfboards } from "@db/schema";
import { eq, asc, sql } from "drizzle-orm";
import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  })
});

export function registerRoutes(app: Express) {
  const server = createServer(app);
  setupAuth(app);

  // Get all public sessions
  app.get("/api/sessions/public", async (req, res) => {
    try {
      // First get all public sessions
      const publicSessions = await db.query.sessions.findMany({
        where: eq(sessions.isPublic, true),
        orderBy: (sessions, { desc }) => [desc(sessions.date)],
        columns: {
          id: true,
          userId: true,
          date: true,
          location: true,
          highlight: true,
          photoUrl: true,
          isPublic: true,
          waveConditions: true,
          waveHeight: true,
          surfboardId: true,
          surfFriends: true,
        },
        with: {
          user: {
            columns: {
              username: true
            }
          },
          surfboard: true
        }
      });

      // Get session counts for all users who have public sessions
      const userIds = Array.from(new Set(publicSessions.map(session => session.userId)));
      const sessionCounts = await Promise.all(
        userIds.map(async (userId) => {
          const [result] = await db
            .select({
              count: sql<number>`cast(count(*) as integer)`,
            })
            .from(sessions)
            .where(eq(sessions.userId, userId));
          return { userId, count: result.count };
        })
      );

      // Create a map for quick lookup
      const userSessionCounts = new Map(
        sessionCounts.map(({ userId, count }) => [userId, count])
      );

      // Attach session counts to the response
      const sessionsWithCounts = publicSessions.map(session => ({
        ...session,
        userSessionCount: userSessionCounts.get(session.userId) || 0
      }));

      res.json(sessionsWithCounts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch public sessions" });
    }
  });

  // Get user's sessions
  app.get("/api/sessions/user", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }

    try {
      const userSessions = await db.query.sessions.findMany({
        where: eq(sessions.userId, req.user.id),
        orderBy: (sessions, { desc }) => [desc(sessions.date)],
        columns: {
          id: true,
          userId: true,
          date: true,
          location: true,
          highlight: true,
          photoUrl: true,
          isPublic: true,
          waveConditions: true,
          waveHeight: true,
          surfboardId: true,
          surfFriends: true,
        },
        with: {
          user: {
            columns: {
              username: true
            }
          },
          surfboard: true
        }
      });
      res.json(userSessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user sessions" });
    }
  });

  // Create new session
  app.post("/api/sessions", upload.single("photo"), async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }

    try {
      const photoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      let surfFriends = [];
      try {
        if (req.body.surfFriends) {
          surfFriends = JSON.parse(req.body.surfFriends);
        }
      } catch (error) {
        console.error('Error parsing friends:', error);
      }
      
      const [newSession] = await db.insert(sessions)
        .values({
          userId: req.user.id,
          location: req.body.location,
          highlight: req.body.highlight,
          photoUrl,
          isPublic: req.body.isPublic === "true" || req.body.isPublic === true,
          waveConditions: req.body.waveConditions,
          waveHeight: req.body.waveHeight ? parseFloat(req.body.waveHeight) : null,
          surfboardId: req.body.surfboardId ? parseInt(req.body.surfboardId) : null,
          surfFriends: surfFriends,
        })
        .returning();
      res.json(newSession);
    } catch (error) {
      res.status(500).json({ error: "Failed to create session" });
    }
  });

  // Get user's surfboards
  app.get("/api/surfboards", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }

    try {
      const userSurfboards = await db
        .select()
        .from(surfboards)
        .where(eq(surfboards.userId, req.user.id))
        .orderBy(asc(surfboards.name));
      res.json(userSurfboards);
    } catch (error) {
      console.error("Error fetching surfboards:", error);
      res.status(500).json({ error: "Failed to fetch surfboards" });
    }
  });

  // Create new surfboard
  app.post("/api/surfboards", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }

    try {
      const [newSurfboard] = await db
        .insert(surfboards)
        .values({
          userId: req.user.id,
          name: req.body.name,
          description: req.body.description || null,
        })
        .returning();
      res.json(newSurfboard);
    } catch (error) {
      console.error("Error creating surfboard:", error);
      res.status(500).json({ error: "Failed to create surfboard" });
    }
  });

  // Delete session
  app.delete("/api/sessions/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }

    try {
      // First check if the session belongs to the user
      const [session] = await db
        .select()
        .from(sessions)
        .where(eq(sessions.id, parseInt(req.params.id)))
        .limit(1);

      if (!session) {
        return res.status(404).send("Session not found");
      }

      if (session.userId !== req.user.id) {
        return res.status(403).send("Not authorized to delete this session");
      }

      // Delete the session
      await db
        .delete(sessions)
        .where(eq(sessions.id, parseInt(req.params.id)));

      res.json({ message: "Session deleted successfully" });
    } catch (error) {
      console.error("Error deleting session:", error);
      res.status(500).json({ error: "Failed to delete session" });
    }
  });

  return server;
}
