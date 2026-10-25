import { auth } from "@/lib/auth";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

type Variables = {
  session: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
};

export const requireAuth = createMiddleware<{ Variables: Variables }>(
  async (c, next) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }
    c.set("session", session);
    await next();
  },
);
