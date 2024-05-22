import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { createId } from "@paralleldrive/cuid2";

/**
 * 
 */
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(), 
  plaidId: text("plaid_id"), 
  name: text("name").notNull(),
  userId: text("user_id").notNull(), // the logged user id that owns the account
});

/**
 * This schema is used for create an account
 */
export const insertAccountSchema = createInsertSchema(accounts);
