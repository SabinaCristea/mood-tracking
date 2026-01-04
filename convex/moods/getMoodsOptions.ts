import { query } from "../_generated/server";

export const getMoodsOptions = query(async (ctx) => {
  return await ctx.db
    .query("moodOptions")
    .withIndex("by_order", (q) => q)
    .collect();
});

export const testPing = query(() => {
  return "ok";
});
