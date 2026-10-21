import {
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const expenses = pgTable("expenses", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  total: numeric({ mode: "number", precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type NewExpense = typeof expenses.$inferInsert;
export type Expense = typeof expenses.$inferSelect;
