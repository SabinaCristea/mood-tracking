import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createMoodForDate = mutation({
  args: {
    userId: v.id("users"),
    moodOptionId: v.id("moodOptions"),
    sleepOptionId: v.id("sleepOptions"),
    feelings: v.array(v.string()),
    note: v.string(),
    date: v.number(), // 👈 timestamp you control
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("moods", {
      userId: args.userId,
      moodOptionId: args.moodOptionId,
      sleepOptionId: args.sleepOptionId,
      feelings: args.feelings,
      note: args.note,
      createdAt: args.date, // 👈 Jan 6
    });
  },
});
