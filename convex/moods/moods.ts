import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { getTodayRange } from "../../src/_lib/helpers/getTodayRange";
import { getRandomQuoteForMoodOption } from "./helpers";

export const createMood = mutation({
  args: {
    moodOptionId: v.id("moodOptions"),
    feelings: v.array(v.string()),
    note: v.string(),
    sleepOptionId: v.id("sleepOptions"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found. Did you forget to sync the Clerk user?");
    }

    const { start, end } = getTodayRange();

    const existing = await ctx.db
      .query("moods")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), user._id),
          q.gte(q.field("createdAt"), start),
          q.lt(q.field("createdAt"), end)
        )
      )
      .first();

    if (existing) {
      throw new Error("Mood already logged for today");
    }

    await ctx.db.insert("moods", {
      userId: user._id,
      moodOptionId: args.moodOptionId,
      feelings: args.feelings,
      note: args.note,
      sleepOptionId: args.sleepOptionId,
      createdAt: Date.now(),
    });
  },
});

export const getMoodForToday = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    const { start, end } = getTodayRange();

    const mood = await ctx.db
      .query("moods")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), user._id),
          q.gte(q.field("createdAt"), start),
          q.lt(q.field("createdAt"), end)
        )
      )
      .first();

    if (!mood) return null;

    // table joins
    const moodOption = await ctx.db.get(mood.moodOptionId);
    if (!moodOption) return null;

    const sleepOption = await ctx.db.get(mood.sleepOptionId);

    const quote = await getRandomQuoteForMoodOption(ctx.db, moodOption._id);

    return {
      _id: mood._id,
      createdAt: mood.createdAt,
      feeling: mood.feelings,
      note: mood.note,

      mood: moodOption
        ? {
            id: moodOption._id,
            label: moodOption.label,
            order: moodOption.order,
          }
        : null,

      sleep: sleepOption
        ? {
            id: sleepOption._id,
            label: sleepOption.label,
            order: sleepOption.order,
          }
        : null,

      randomQuote: quote,
    };
  },
});
