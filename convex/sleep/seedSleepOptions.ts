// import { mutation } from "../_generated/server";

// export const seedSleepOptions = mutation(async (ctx) => {
//   const existing = await ctx.db.query("sleepOptions").collect();

//   if (existing.length > 0) return;

//   const options = [
//     { order: 1, label: "9+ hours" },
//     { order: 2, label: "7-8 hours" },
//     { order: 3, label: "5-6 hours" },
//     { order: 4, label: "3-4 hours" },
//     { order: 5, label: "0-2 hours" },
//   ];

//   for (const opt of options) {
//     await ctx.db.insert("sleepOptions", opt);
//   }
// });

//DELETED AFTER RAN
