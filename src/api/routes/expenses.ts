import {
  createNewExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
} from "@/db/queries/expenses";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { requireAuth } from "../middleware/auth";
import { CreateExpense, UpdateExpense } from "../validation/expenses";

const router = new Hono();

router.use(requireAuth);

router.get("/", async (c) => {
  const expenses = await getAllExpenses();
  return c.json(expenses);
});

router.get("/:id", async (c) => {
  const expense = await getExpense(c.req.param("id"));
  if (!expense) {
    throw new HTTPException(404, { message: "Not Found" });
  }
  return c.json(expense);
});

router.post("/", zValidator("json", CreateExpense), async (c) => {
  const data = c.req.valid("json");
  const created = await createNewExpense(data);
  return c.json(created, 201);
});

router.put("/:id", zValidator("json", UpdateExpense), async (c) => {
  const id = c.req.param("id");
  const data = c.req.valid("json");
  const updated = await updateExpense(id, data);
  if (!updated) {
    throw new HTTPException(404, { message: "Not Found" });
  }
  return c.json(updated);
});

router.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const deleted = await deleteExpense(id);
  if (!deleted) {
    throw new HTTPException(404, { message: "Not Found" });
  }
  return c.body(null, 204);
});

export default router;
