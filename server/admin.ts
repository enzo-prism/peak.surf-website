import { type Express, Request, Response, NextFunction } from "express";
import { db } from "../db";
import { sessions } from "@db/schema";
import { eq } from "drizzle-orm";

// Middleware to check if user is admin
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Not authenticated");
  }

  if (!req.user.isAdmin) {
    return res.status(403).send("Not authorized");
  }

  next();
}

export function setupAdminRoutes(app: Express) {
  // Get all sessions (for admin)
  app.get("/api/admin/sessions", isAdmin, async (req, res) => {
    try {
      const allSessions = await db.query.sessions.findMany({
        orderBy: (sessions, { desc }) => [desc(sessions.date)],
        with: {
          user: {
            columns: {
              username: true,
              profilePhotoUrl: true
            }
          },
          surfboard: true
        }
      });
      res.json(allSessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sessions" });
    }
  });

  // Delete any session (admin only)
  app.delete("/api/admin/sessions/:id", isAdmin, async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      
      // Check if session exists
      const [session] = await db
        .select()
        .from(sessions)
        .where(eq(sessions.id, sessionId))
        .limit(1);

      if (!session) {
        return res.status(404).send("Session not found");
      }

      // Delete the session
      await db
        .delete(sessions)
        .where(eq(sessions.id, sessionId));

      res.json({ message: "Session deleted successfully" });
    } catch (error) {
      console.error("Error deleting session:", error);
      res.status(500).json({ error: "Failed to delete session" });
    }
  });
}
