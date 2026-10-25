import { Hono } from "hono";
import expenses from "./routes/expenses";

const api = new Hono();

api.use(async (c, next) => {
  await next();
  console.log(c.req.method, c.req.path, c.res.status);
});

api.get("/health", async (c) => {
  return c.json({ status: "ok" });
});

api.route("/expenses", expenses);

export default api;
