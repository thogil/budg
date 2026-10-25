import { auth } from "@/lib/auth";
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

api.on(["GET", "POST"], "/auth/*", (c) => auth.handler(c.req.raw));
api.route("/expenses", expenses);

export default api;
