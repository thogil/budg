import { Hono } from "hono";
import api from "./api";
import config from "./config";

const app = new Hono();

app.get("/", (c) => {
  return c.text(`Hello from ${config.APP_NAME}`);
});

app.route("/api", api);

export default {
  port: config.PORT,
  fetch: app.fetch,
};
