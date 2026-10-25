import {
  createNewExpense,
  getAllExpenses,
  getExpense,
} from "@/db/queries/expenses";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import * as z from "zod";

const schema = z.object({
  title: z.string().nonempty(),
  total: z.number().gte(0),
});

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

router.post("/", zValidator("json", schema), async (c) => {
  const data = c.req.valid("json");
  const created = await createNewExpense(data);
  return c.json(created, 201);
});

export default router;
