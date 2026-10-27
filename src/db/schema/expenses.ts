import {
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { users } from "./users";

export const expenses = pgTable("expenses", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  total: numeric({ mode: "number", precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
});

export type NewExpense = typeof expenses.$inferInsert;
export type Expense = typeof expenses.$inferSelect;
