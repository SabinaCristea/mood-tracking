export const MOOD_MAP = {
  1: 2, // Very Happy
  2: 1, // Happy
  3: 0, // Neutral
  4: -1, // Sad
  5: -2, // Very Sad
} as const;

export const MOOD_MAP_REVERSE = {
  2: 1,
  1: 2,
  0: 3,
  "-1": 4,
  "-2": 5,
} as const;
