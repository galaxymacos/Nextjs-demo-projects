import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "unauthorized" }, 401);
    }
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));
    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator("param", z.object({  //  validate the route as /accounts/18
      id: z.string().optional()
    })),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")
      if (!id) {
        return c.json({ error: "Missing id" }, 400)
      }
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401)
      }
      const [data] = await db.select({  // filter by account id will return only one account, so get the first data
        id: accounts.id,  // get the id field from accounts schema and name it id
        name: accounts.name // get the name field from accounts schema and name it name
      })
      .from(accounts) // accounts schema
      .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))
      if (!data) {
        return c.json({error: "Not found"}, 404)
      }
      return c.json({data})
    }
  )
  // * post request to insert an account providing { name: "xxx" } in json
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertAccountSchema.pick({
        name: true,
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
      const values = c.req.valid("json");
      const [data] = await db // get the first data
        .insert(accounts)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values,
        })
        .returning();

      return c.json({ data });
    },
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      // check if the user is logined
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      //
      const values = c.req.valid("json");
      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, values.ids),
          ),
        )
        .returning({
          id: accounts.id,
        });
      return c.json({ data });
    },
  );

export default app;
