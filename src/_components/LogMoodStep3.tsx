"use client";

import { useState } from "react";
import { Button } from "./Button";

import infoIcon from "/public/assets/images/info-circle.svg";
import Image from "next/image";

const MAX_CHARS = 150;

type LogMoodStep3Props = {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
};

export const LogMoodStep3 = ({
  value,
  onChange,
  onContinue,
}: LogMoodStep3Props) => {
  const [error, setError] = useState("");
  // const [text, setText] = useState("");

  const handleContinue = () => {
    if (value.length === 0) {
      setError("Please write a few words about your day before continuing.");
      return;
    }

    setError("");
    onContinue();
  };
  console.log("lungime text", value.length);

  return (
    <div className="w-full flex flex-col gap-[2.4rem]">
      <h1 className="text-[2.8rem] leading-[130%] tracking-[-0.3px] font-bold">
        Write about your day...
      </h1>
      {/* Textarea */}
      <div className="flex flex-col gap-[0.8rem]">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={MAX_CHARS}
          placeholder="Today I felt..."
          className="resize-none w-full !h-[15rem] border border-neutral-300 bg-neutral-0 rounded-[1rem]  px-[1.6rem] py-[1.2rem] placeholder:text-[1.8rem] placeholder:leading-[130%] placeholder:tracking-[0px] placeholder:italic placeholder:text-neutral-600 text-preset-6-regular text-neutral-900 outline-focus"
        />
        <div className="self-end text-preset-8">
          {value.length}/{MAX_CHARS}
        </div>
      </div>

      <div>
        {error && (
          <div className="flex items-center gap-[0.6rem] mb-[1.6rem]">
            <Image src={infoIcon} alt="Info icon" />
            <p className="text-red-500 text-[1.2rem] leading-[110%]">{error}</p>
          </div>
        )}
        <Button label="Continue" onClick={handleContinue} isFullWidth={true} />
      </div>
    </div>
  );
};
