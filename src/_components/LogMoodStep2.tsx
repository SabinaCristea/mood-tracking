"use client";
import React, { useState } from "react";
import CheckIcon from "./CheckIcon";
import { Button } from "./Button";
import Image from "next/image";

import infoIcon from "/public/assets/images/info-circle.svg";

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
  "Motivated",
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

export const LogMoodStep2 = ({ onContinue }: { onContinue: () => void }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");

  const toggleFeeling = (feeling: string) => {
    const isSelected = selected.includes(feeling);

    let newSelected: string[];

    if (isSelected) {
      newSelected = selected.filter((x) => x !== feeling);
    } else {
      newSelected = [...selected, feeling];
    }

    setSelected(newSelected);

    if (selected.length > 3) {
      setError("You can only select a maximum of 3 tags");
    } else {
      setError("");
    }
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      setError("Please select at least one tag");
      return;
    }

    if (selected.length > 3) {
      setError("You can only select a maximum of 3 tags");
      return;
    }

    setError("");
    onContinue();
  };

  return (
    <div className="w-full">
      <h1 className="text-[2.8rem] leading-[130%] tracking-[-0.3px] font-bold">
        How did you feel?
      </h1>
      <p className="text-neutral-600 text-preset-6">Select up to three tags:</p>
      <div className="flex flex-wrap gap-3 my-[3.2rem]">
        {feelings.length > 0 &&
          feelings.map((feeling) => {
            const isSelected = selected.includes(feeling);

            return (
              <button
                key={feeling}
                onClick={() => toggleFeeling(feeling)}
                className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-xl border
        transition-all duration-200
        ${isSelected ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 bg-white text-gray-600"}
      `}
              >
                <span
                  className={`
          w-4 h-4 flex items-center justify-center rounded-sm border
          ${isSelected ? "bg-blue-500 border-blue-500 text-white" : "border-gray-400"}
        `}
                >
                  {isSelected && <CheckIcon size={12} />}
                </span>
                {feeling}
              </button>
            );
          })}
      </div>

      {error && (
        <div className="flex items-center gap-[0.6rem] mb-[1.6rem]">
          <Image src={infoIcon} alt="Info icon" />
          <p className="text-red-500 text-[1.2rem] leading-[110%]">{error}</p>
        </div>
      )}

      <Button label="Continue" onClick={handleContinue} isFullWidth={true} />
    </div>
  );
};
