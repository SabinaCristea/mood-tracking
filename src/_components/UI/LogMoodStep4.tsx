"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { InfoIcon } from "../icons/InfoIcon";

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
  const [error, setError] = useState<string>("");

  const options = useQuery(api.sleep.getSleepOptions.getSleepOptions);

  //useQuery returns undefined on first render.
  if (!options) return null;

  const handleSubmit = () => {
    if (!value) {
      setError("Please select an option before submitting.");
      return;
    }
    setError("");
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
          <InfoIcon />
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
