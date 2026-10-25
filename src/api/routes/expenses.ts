import {
  createNewExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseByID,
  updateExpense,
} from "@/db/queries/expenses";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { AuthVars, requireAuth } from "../middleware/auth";
import { CreateExpense, UpdateExpense } from "../validation/expenses";

const router = new Hono<{ Variables: AuthVars }>();

router.use(requireAuth);

router.get("/", async (c) => {
  const { user } = c.get("session");
  const expenses = await getAllExpenses(user.id);
  return c.json(expenses);
});

router.get("/:id", async (c) => {
  const expense = await getExpenseByID(c.req.param("id"));
  if (!expense) {
    throw new HTTPException(404);
  }
  const { user } = c.get("session");
  if (expense.userId != user.id) {
    throw new HTTPException(403);
  }
  return c.json(expense);
});

router.post("/", zValidator("json", CreateExpense), async (c) => {
  const { user } = c.get("session");
  const data = c.req.valid("json");
  const created = await createNewExpense(data, user.id);
  return c.json(created, 201);
});

router.put("/:id", zValidator("json", UpdateExpense), async (c) => {
  const data = c.req.valid("json");
  const expense = await getExpenseByID(c.req.param("id"));
  if (!expense) {
    throw new HTTPException(404);
  }
  const { user } = c.get("session");
  if (expense.userId != user.id) {
    throw new HTTPException(403);
  }
  const updated = await updateExpense(expense.id, data);
  return c.json(updated);
});

router.delete("/:id", async (c) => {
  const expense = await getExpenseByID(c.req.param("id"));
  if (!expense) {
    throw new HTTPException(404);
  }
  const { user } = c.get("session");
  if (expense.userId != user.id) {
    throw new HTTPException(403);
  }
  await deleteExpense(expense.id);
  return c.body(null, 204);
});

export default router;
