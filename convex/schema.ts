import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    firstName: v.string(),
    lastName: v.string(),
    imageUrl: v.string(),
    createdAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  moods: defineTable({
    userId: v.id("users"),
    moodOptionId: v.id("moodOptions"),
    feelings: v.array(v.string()),
    note: v.string(),
    sleepOptionId: v.id("sleepOptions"),
    createdAt: v.number(),
  }),

  moodOptions: defineTable({
    order: v.number(),
    label: v.string(),
  }).index("by_order", ["order"]),

  moodQuotes: defineTable({
    moodOptionId: v.id("moodOptions"),
    text: v.string(),
  }),

  sleepOptions: defineTable({
    order: v.number(),
    label: v.string(),
  }).index("by_order", ["order"]),
});
