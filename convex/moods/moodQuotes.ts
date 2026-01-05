import { v } from "convex/values";
import { query } from "../_generated/server";
import { getRandomQuoteForMoodOption } from "./helpers";

export const getRandomQuoteForMood = query({
  args: { mood: v.number() },
  handler: async (ctx, { mood }) => {
    const moodOption = await ctx.db
      .query("moodOptions")
      .withIndex("by_order", (q) => q.eq("order", mood))
      .unique();

    if (!moodOption) return null;

    return await getRandomQuoteForMoodOption(ctx.db, moodOption._id);
  },
});
