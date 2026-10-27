import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 50 }).notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type NewCategory = typeof categories.$inferInsert;
export type Category = typeof categories.$inferSelect;
