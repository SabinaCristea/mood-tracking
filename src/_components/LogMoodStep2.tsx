import React from "react";

const feelings = [
  "Joyful",
  "Down",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Lonely",
  "Grateful",
  "Overwhelmed",
  "Mortivated",
  "Irritable",
  "Peaceful",
  "Tired",
  "Hopeful",
  "Confident",
  "Stressed",
  "Content",
  "Dissapointed",
  "Optimmistic",
  "Restless",
];

export const LogMoodStep2 = () => {
  return (
    <div>
      <h1 className="text-[2.8rem] leading-[130%] tracking-[-0.3px] font-bold">
        How did you feel?
      </h1>
      <p>Select up to three tags:</p>
    </div>
  );
};
