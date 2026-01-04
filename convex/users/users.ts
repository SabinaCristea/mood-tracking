import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const syncClerkUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    imageUrl: v.string(),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) return;

    await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
