import { db } from "@/lib/database";
import { desc, eq } from "drizzle-orm";
import { expenses, NewExpense } from "../schema/expenses";

export async function createNewExpense(expense: NewExpense) {
  const [result] = await db
    .insert(expenses)
    .values(expense)
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function getAllExpenses() {
  const result = await db
    .select()
    .from(expenses)
    .orderBy(desc(expenses.createdAt));
  return result;
}

export async function getExpense(id: string) {
  const [result] = await db
    .select()
    .from(expenses)
    .where(eq(expenses.id, id))
    .limit(1);
  return result;
}
