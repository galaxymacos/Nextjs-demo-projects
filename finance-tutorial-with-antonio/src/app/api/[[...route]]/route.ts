import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "@/app/api/[[...route]]/accounts";
import categories from "@/app/api/[[...route]]/categories";
import transactions from "@/app/api/[[...route]]/transactions";
import summary from "@/app/api/[[...route]]/summary";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// redirecting
const routes = app
  .route("/summary", summary)
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
