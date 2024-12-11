import { type Express } from "express";
import { setupAuth } from "./auth";
import { db } from "../db";
import { sessions, surfboards } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  })
});

import { createServer } from "http";

export function registerRoutes(app: Express) {
  const server = createServer(app);
  setupAuth(app);

  // Get all public sessions
  app.get("/api/sessions/public", async (req, res) => {
    try {
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
      res.json(publicSessions);
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
          console.log('Parsed friends:', surfFriends);
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

  return server;
}
