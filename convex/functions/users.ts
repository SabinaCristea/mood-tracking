import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const saveUserProfile = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { name: args.name });
    } else {
      await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        name: args.name,
        createdAt: new Date().toISOString(),
      });
    }
  },
});
