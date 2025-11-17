import { mutation } from "./_generated/server";

export const syncClerkUser = mutation(async ({ db }, clerkUser) => {
  const existing = await db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkUser.id))
    .unique();

  const userData = {
    clerkId: clerkUser.id,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    imageUrl: clerkUser.imageUrl || "",
    email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
  };

  if (existing) {
    await db.patch(existing._id, userData);
  } else {
    await db.insert("users", userData);
  }
});
