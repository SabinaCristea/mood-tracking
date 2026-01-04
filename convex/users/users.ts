import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const syncClerkUser = mutation({
  args: {
    clerkUser: v.object({
      id: v.string(),
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      emailAddresses: v.optional(
        v.array(
          v.object({
            emailAddress: v.string(),
          })
        )
      ),
    }),
  },

  handler: async (ctx, { clerkUser }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkUser.id))
      .unique();

    const userData = {
      clerkId: clerkUser.id,
      firstName: clerkUser.firstName ?? "",
      lastName: clerkUser.lastName ?? "",
      imageUrl: clerkUser.imageUrl ?? "",
      email: clerkUser.emailAddresses?.[0]?.emailAddress ?? "",
    };

    if (existing) {
      await ctx.db.patch(existing._id, userData);
    } else {
      await ctx.db.insert("users", {
        ...userData,
        createdAt: Date.now(),
      });
    }
  },
});
