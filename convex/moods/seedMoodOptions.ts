// // [
// //   { id: 2, label: "Very Happy", icon: VeryHappyface },
// //   { id: 1, label: "Happy", icon: Happyface },
// //   { id: 0, label: "Neutral", icon: Neutralface },
// //   { id: -1, label: "Sad", icon: Sadface },
// //   { id: -2, label: "Very Sad", icon: VerySadface },
// // ]

// import { mutation } from "../_generated/server";

// export const seedMoodOptions = mutation(async (ctx) => {
//   const existing = await ctx.db.query("moodOptions").collect();

//   if (existing.length > 0) return;

//   const options = [
//     { order: 2, label: "Very Happy" },
//     { order: 1, label: "Happy" },
//     { order: 0, label: "Neutral" },
//     { order: -1, label: "Sad" },
//     { order: -2, label: "Very Sad" },
//   ];

//   for (const opt of options) {
//     await ctx.db.insert("moodOptions", opt);
//   }
// });
