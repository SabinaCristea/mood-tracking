import { Id } from "../../../convex/_generated/dataModel";

export type MoodEntryDraft = {
  mood: -2 | -1 | 0 | 1 | 2 | null;
  feelings: string[];
  note: string;
  sleepOptionId: Id<"sleepOptions"> | null;
};
