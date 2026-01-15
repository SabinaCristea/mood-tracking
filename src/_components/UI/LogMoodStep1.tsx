"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import VeryHappyface from "/public/assets/images/icon-very-happy-color.svg";
import Happyface from "/public/assets/images/icon-happy-color.svg";
import Neutralface from "/public/assets/images/icon-neutral-color.svg";
import Sadface from "/public/assets/images/icon-sad-color.svg";
import VerySadface from "/public/assets/images/icon-very-sad-color.svg";
import { Button } from "./Button";

import infoIcon from "/public/assets/images/info-circle.svg";
import { MoodEntryDraft } from "@/_lib/helpers/types";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { MOOD_ICONS } from "@/_lib/helpers/moodFaces";
import { InfoIcon } from "../icons/InfoIcon";

// const options = [
//   { id: 2, label: "Very Happy", icon: VeryHappyface },
//   { id: 1, label: "Happy", icon: Happyface },
//   { id: 0, label: "Neutral", icon: Neutralface },
//   { id: -1, label: "Sad", icon: Sadface },
//   { id: -2, label: "Very Sad", icon: VerySadface },
// ];

type LogMoodStep1Props = {
  value: Id<"moodOptions"> | null;
  onChange: (value: Id<"moodOptions">) => void;
  onContinue: () => void;
};

export const LogMoodStep1 = ({
  value,
  onChange,
  onContinue,
}: LogMoodStep1Props) => {
  const selected = value;

  const [error, setError] = useState<string>("");

  const options = useQuery(api.moods.getMoodsOptions.getMoodsOptions);

  if (!options) return null;

  const handleContinue = () => {
    if (selected === null) {
      setError("Please select a mood before continuing.");
      return;
    }
    setError(""); // clear error
    onContinue();
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h1 className="text-[2.8rem] leading-[130%] tracking-[-0.3px] font-bold">
        How was your mood today?
      </h1>

      <section role="options" className="flex flex-col gap-[1.2rem]">
        {options.map((opt) => {
          const IconComponent =
            MOOD_ICONS[opt.order as keyof typeof MOOD_ICONS];

          return (
            <button
              key={opt._id}
              onClick={() => onChange(opt._id)}
              className={`
              px-8 py-[1.2rem] flex items-center gap-[1.2rem]
              border-2 rounded-2xl bg-white outline-focus
              transition-all
              ${
                selected === opt._id
                  ? "border-blue-600 bg-blue-50"
                  : "border-blue-100"
              }
            `}
            >
              <div
                className={`
                w-8 h-8 rounded-full border-2
                transition-all
                ${
                  selected === opt._id
                    ? "border-blue-600 border-[5px]"
                    : "border-blue-200 bg-white"
                }
              `}
              ></div>

              <p className={`text-left text-[2rem] font-semibold `}>
                {opt.label}
              </p>

              {IconComponent && (
                <IconComponent className="w-[3.8rem] h-[3.8rem] ml-auto" />
              )}
            </button>
          );
        })}
      </section>

      {error && (
        <div className="flex items-center  gap-[0.8rem]">
          <InfoIcon />
          <p className="text-red-500 text-[1.2rem] leading-[110%]">{error}</p>
        </div>
      )}

      <Button label="Continue" onClick={handleContinue} isFullWidth={true} />
    </div>
  );
};
