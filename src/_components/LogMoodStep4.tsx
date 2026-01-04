"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./Button";

import infoIcon from "/public/assets/images/info-circle.svg";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

// const options = [
//   { id: 1, label: "9+ hours" },
//   { id: 2, label: "7-8 hours" },
//   { id: 3, label: "5-6 hours" },
//   { id: 4, label: "3-4 hours" },
//   { id: 5, label: "0-2 hours" },
// ];

type LogMoodStep4Props = {
  value: Id<"sleepOptions"> | null;
  onChange: (value: Id<"sleepOptions">) => void;
  onSubmit: () => void;
  loading: boolean;
};

export const LogMoodStep4 = ({
  value,
  onChange,
  onSubmit,
  loading,
}: LogMoodStep4Props) => {
  //const [selected, setSelected] = useState<number | null>(null);

  const [error, setError] = useState<string>("");

  const options = useQuery(api.functions.getSleepOptions.getSleepOptions);

  //useQuery returns undefined on first render.
  if (!options) return null;

  const handleSubmit = () => {
    if (!value) {
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
        {options?.map((opt) => (
          <button
            key={opt._id}
            onClick={() => onChange(opt._id)}
            className={`
              px-8 py-[1.2rem] flex items-center gap-[1.2rem]
              border-2 rounded-2xl bg-white outline-focus
              transition-all
              ${
                value === opt._id
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
                  value === opt._id
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
