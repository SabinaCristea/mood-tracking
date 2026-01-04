import { mutation } from "../_generated/server";
import { v } from "convex/values";

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
