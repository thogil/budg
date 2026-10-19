import { Hono } from "hono";
import config from "./config";

const app = new Hono();

app.get("/", (c) => {
  return c.text(`Hello from ${config.APP_NAME}`);
});

export default {
  port: config.PORT,
  fetch: app.fetch,
};
