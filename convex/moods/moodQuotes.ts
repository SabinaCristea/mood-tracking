import { v } from "convex/values";
import { query } from "../_generated/server";

export const getRandomQuoteForMood = query({
  args: { mood: v.number() },
  handler: async (ctx, { mood }) => {
    const moodOption = await ctx.db
      .query("moodOptions")
      .withIndex("by_order", (q) => q.eq("order", mood))
      .unique();

    if (!moodOption) return null;

    const quotes = await ctx.db
      .query("moodQuotes")
      .filter((q) => q.eq(q.field("moodOptionId"), moodOption._id))
      .collect();

    if (quotes.length === 0) return null;

    return quotes[Math.floor(Math.random() * quotes.length)];
  },
});
