"use client";

import Image from "next/image";
import React, { useState } from "react";
import VeryHappyface from "/public/assets/images/icon-very-happy-color.svg";
import Happyface from "/public/assets/images/icon-happy-color.svg";
import Neutralface from "/public/assets/images/icon-neutral-color.svg";
import Sadface from "/public/assets/images/icon-sad-color.svg";
import VerySadface from "/public/assets/images/icon-very-sad-color.svg";
import { Button } from "./Button";

import infoIcon from "/public/assets/images/info-circle.svg";

const options = [
  { id: 1, label: "Very Happy", icon: VeryHappyface },
  { id: 2, label: "Happy", icon: Happyface },
  { id: 3, label: "Neutral", icon: Neutralface },
  { id: 4, label: "Sad", icon: Sadface },
  { id: 5, label: "Very Sad", icon: VerySadface },
];

export const LogMoodStep1 = ({ onContinue }: { onContinue: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const [error, setError] = useState<string>("");

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
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`
              px-[2rem] py-[1.2rem] flex items-center gap-[1.2rem]
              border-[2px] rounded-[1rem] bg-white outline-focus
              transition-all
              ${
                selected === opt.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-blue-100"
              }
            `}
          >
            <div
              className={`
                w-[2rem] h-[2rem] rounded-full border-[2px]
                transition-all
                ${
                  selected === opt.id
                    ? "border-blue-600 border-[5px]"
                    : "border-blue-200 bg-white"
                }
              `}
            ></div>

            <p className={`text-left text-[2rem] font-semibold `}>
              {opt.label}
            </p>

            <Image
              src={opt.icon}
              alt="emoji"
              className="w-[3.8rem] h-[3.8rem] ml-auto"
            />
          </button>
        ))}
      </section>

      {error && (
        <div className="flex items-center  gap-[0.8rem]">
          <Image src={infoIcon} alt="Info icon" />
          <p className="text-red-500 text-[1.2rem] leading-[110%]">{error}</p>
        </div>
      )}

      <Button label="Continue" onClick={handleContinue} isFullWidth={true} />
    </div>
  );
};
