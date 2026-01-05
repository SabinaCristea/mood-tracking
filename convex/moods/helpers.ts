import { Id } from "../_generated/dataModel";
import { DatabaseReader } from "../_generated/server";

export async function getRandomQuoteForMoodOption(
  db: DatabaseReader,
  moodOptionId: Id<"moodOptions">
) {
  const quotes = await db
    .query("moodQuotes")
    .filter((q) => q.eq(q.field("moodOptionId"), moodOptionId))
    .collect();

  if (quotes.length === 0) return null;

  return quotes[Math.floor(Math.random() * quotes.length)];
}
