import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

export const surfboards = pgTable("surfboards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: timestamp("date").defaultNow().notNull(),
  location: text("location").notNull(),
  highlight: text("highlight"),
  photoUrl: text("photo_url"),
  isPublic: boolean("is_public").default(false).notNull(),
  waveConditions: text("wave_conditions"),
  waveHeight: real("wave_height"),
  surfboardId: integer("surfboard_id").references(() => surfboards.id),
  surfFriends: text("surf_friends").array(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  surfboards: many(surfboards),
}));

export const surfboardsRelations = relations(surfboards, ({ one }) => ({
  user: one(users, {
    fields: [surfboards.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
  surfboard: one(surfboards, {
    fields: [sessions.surfboardId],
    references: [surfboards.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertSurfboardSchema = createInsertSchema(surfboards);
export const selectSurfboardSchema = createSelectSchema(surfboards);

export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Surfboard = typeof surfboards.$inferSelect;
export type InsertSurfboard = typeof surfboards.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;
