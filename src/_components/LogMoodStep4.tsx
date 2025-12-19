"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./Button";

import infoIcon from "/public/assets/images/info-circle.svg";

const options = [
  { id: 1, label: "9+ hours" },
  { id: 2, label: "7-8 hours" },
  { id: 3, label: "5-6 hours" },
  { id: 4, label: "3-4 hours" },
  { id: 5, label: "0-2 hours" },
];

export const LogMoodStep4 = ({
  onSubmit,
  loading,
}: {
  onSubmit: () => void;
  loading: boolean;
}) => {
  const [selected, setSelected] = useState<number | null>(null);

  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (selected === null) {
      setError("Please select an option before submitting.");
      return;
    }
    setError(""); // clear error
    onSubmit();
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h1 className="text-[2.8rem] leading-[130%] tracking-[-0.3px] font-bold">
        How many hours did you sleep last night?
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
          </button>
        ))}
      </section>

      {error && (
        <div className="flex items-center  gap-[0.8rem]">
          <Image src={infoIcon} alt="Info icon" />
          <p className="text-red-500 text-[1.2rem] leading-[110%]">{error}</p>
        </div>
      )}

      <Button
        label={loading ? "Submitting ..." : "Submit"}
        onClick={handleSubmit}
        isFullWidth={true}
      />
    </div>
  );
};
