import { Hono } from "hono";
import { routeLogger } from "./middleware/logging";
import expenses from "./routes/expenses";

const api = new Hono();

api.use(routeLogger);

api.get("/health", async (c) => {
  return c.json({ status: "ok" });
});

api.route("/expenses", expenses);

export default api;
