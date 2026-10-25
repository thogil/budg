import { db } from "@/lib/database";
import { desc, eq } from "drizzle-orm";
import { Expense, expenses, NewExpense } from "../schema/expenses";

export async function createNewExpense(
  expense: Omit<NewExpense, "userId">,
  userId: string,
) {
  const [result] = await db
    .insert(expenses)
    .values({ userId, ...expense })
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function getAllExpenses(userId: string) {
  const result = await db
    .select()
    .from(expenses)
    .where(eq(expenses.userId, userId))
    .orderBy(desc(expenses.createdAt));
  return result;
}

export async function getExpenseByID(id: string) {
  const [result] = await db
    .select()
    .from(expenses)
    .where(eq(expenses.id, id))
    .limit(1);
  return result;
}

export async function deleteExpense(id: string) {
  await db.delete(expenses).where(eq(expenses.id, id));
}

export async function updateExpense(id: string, data: Partial<Expense>) {
  const [result] = await db
    .update(expenses)
    .set(data)
    .where(eq(expenses.id, id))
    .returning();
  return result;
}
