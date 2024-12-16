import { type Express, Request, Response, NextFunction } from "express";
import { db } from "../db";
import { sessions } from "@db/schema";
import { eq } from "drizzle-orm";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // Default for development

// Middleware to check if user has provided correct admin password
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Not authenticated");
  }

  const session = req.session as any;
  if (!session.isAdminAuthorized) {
    return res.status(403).send("Not authorized");
  }

  next();
}

// Export both admin setup functions
export function setupAdminAuth(app: Express) {
  app.post("/api/admin/verify", (req, res) => {
    const { password } = req.body;
    
    if (password === ADMIN_PASSWORD) {
      (req.session as any).isAdminAuthorized = true;
      res.json({ message: "Authorized" });
    } else {
      res.status(403).send("Invalid password");
    }
  });
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

  // Bulk delete sessions (admin only)
  app.delete("/api/admin/sessions/bulk-delete", isAdmin, async (req, res) => {
    try {
      const { ids } = req.body;
      
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).send("Invalid session IDs provided");
      }

      // Delete all selected sessions
      await db
        .delete(sessions)
        .where(sql`id = ANY(${ids})`);

      res.json({ message: `Successfully deleted ${ids.length} sessions` });
    } catch (error) {
      console.error("Error bulk deleting sessions:", error);
      res.status(500).json({ error: "Failed to delete sessions" });
    }
  });
}
