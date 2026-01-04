import { query } from "../_generated/server";

export const getSleepOptions = query(async (ctx) => {
  return await ctx.db
    .query("sleepOptions")
    .withIndex("by_order", (q) => q)
    .collect();
});
