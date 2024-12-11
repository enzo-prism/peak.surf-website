import { type Express } from "express";
import { setupAuth } from "./auth";
import { db } from "../db";
import { sessions } from "@db/schema";
import { eq } from "drizzle-orm";
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
        with: {
          user: {
            columns: {
              username: true
            }
          }
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
        with: {
          user: {
            columns: {
              username: true
            }
          }
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
      const [newSession] = await db.insert(sessions)
        .values({
          userId: req.user.id,
          location: req.body.location,
          highlight: req.body.highlight,
          photoUrl,
          isPublic: req.body.isPublic === "true",
        })
        .returning();
      res.json(newSession);
    } catch (error) {
      res.status(500).json({ error: "Failed to create session" });
    }
  });

  return server;
}
