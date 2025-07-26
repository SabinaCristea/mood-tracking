import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    createdAt: v.string(),
  }),
  mood_entries: defineTable({
    createdAt: v.string(),
    mood: v.number(),
    feelings: v.array(v.string()),
    journalEntry: v.string(),
    sleepHours: v.number(),
  }),
  mood_quotes: defineTable({
    mood: v.number(),
    text: v.string(),
  }),
});
