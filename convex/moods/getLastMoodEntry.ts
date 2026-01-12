import { query } from "../_generated/server";

export const getLastMoodEntry = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return [];
    }

    const moods = await ctx.db
      .query("moods")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .order("desc")
      .take(1);

    const result = await Promise.all(
      moods.map(async (mood) => {
        const moodOption = await ctx.db.get(mood.moodOptionId);
        const sleepOption = await ctx.db.get(mood.sleepOptionId);

        return {
          _id: mood._id,
          createdAt: mood.createdAt,
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
        };
      })
    );

    return result;
  },
});
