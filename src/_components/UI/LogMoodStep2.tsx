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

type LogMoodStep2Props = {
  value: string[];
  onChange: (value: string[]) => void;
  onContinue: () => void;
};

export const LogMoodStep2 = ({
  value,
  onChange,
  onContinue,
}: LogMoodStep2Props) => {
  //const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");

  const toggleFeeling = (feeling: string) => {
    const isSelected = value.includes(feeling);

    let newSelected: string[];

    if (isSelected) {
      newSelected = value.filter((x) => x !== feeling);
    } else {
      newSelected = [...value, feeling];
    }

    //setSelected(newSelected);

    if (newSelected.length > 3) {
      setError("You can only select a maximum of 3 tags");
    } else {
      setError("");
    }

    setError("");
    onChange(newSelected);
  };

  const handleContinue = () => {
    if (value.length === 0) {
      setError("Please select at least one tag");
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
            const isSelected = value.includes(feeling);

            return (
              <button
                key={feeling}
                onClick={() => toggleFeeling(feeling)}
                className={`
        inline-flex items-center gap-[1.2rem] px-[1.6rem] py-[1.2rem] rounded-2xl border-2
        transition-all duration-200
        ${isSelected ? "border-blue-600" : "border-blue-100 "}
      `}
              >
                <span
                  className={`
          w-[1.6rem] h-[1.6rem] flex items-center justify-center rounded-sm border-[1.5px]
          ${isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-blue-200"}
        `}
                >
                  {isSelected && <CheckIcon size={9} />}
                </span>
                <p className="text-preset-6-regular">{feeling}</p>
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

      <Button label="Continue" onClick={handleContinue} isFullWidth />
    </div>
  );
};
