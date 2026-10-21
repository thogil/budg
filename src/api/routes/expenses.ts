import {
  createNewExpense,
  getAllExpenses,
  getExpense,
} from "@/db/queries/expenses";
import { Hono } from "hono";

type NewExpense = {
  title: string;
  total: number;
};

const router = new Hono();

router.get("/", async (c) => {
  const expenses = await getAllExpenses();
  return c.json(expenses);
});

router.get("/:id", async (c) => {
  const expense = await getExpense(c.req.param("id"));
  if (!expense) {
    return c.body(null, 404);
  }
  return c.json(expense);
});

router.post("/", async (c) => {
  const expense = await c.req.json<NewExpense>();
  const created = await createNewExpense(expense);
  return c.json(created, 201);
});

export default router;
