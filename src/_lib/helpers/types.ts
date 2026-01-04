import { Id } from "../../../convex/_generated/dataModel";

export type MoodEntryDraft = {
  moodOptionId: Id<"moodOptions"> | null;
  feelings: string[];
  note: string;
  sleepOptionId: Id<"sleepOptions"> | null;
};
