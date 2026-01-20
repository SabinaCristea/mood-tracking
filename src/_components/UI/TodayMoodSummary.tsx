import { MOOD_ICONS } from "@/_lib/helpers/moodFaces";
import React from "react";
import { ZzzIcon } from "@/_components/icons/ZzzIcon";
import { ReflectionsIcon } from "@/_components/icons/ReflectionsIcon";
import { QuotesIcon } from "../icons/QuotesIcon";

export const TodayMoodSummary = ({
  moodLabel,
  moodOrder,
  moodQuote,
  hoursOfSleep,
  reflection,
  feelings,
}: {
  moodLabel: string | undefined;
  moodOrder?: number;
  moodQuote: string | undefined;
  hoursOfSleep: string | undefined;
  reflection: string;
  feelings: string[];
}) => {
  const SelectedIcon =
    moodOrder !== undefined
      ? MOOD_ICONS[moodOrder as keyof typeof MOOD_ICONS]
      : null;

  return (
    <div className="flex flex-col gap-8 mb-[-1.6rem] mt-[1.6rem] lg:flex-row lg:gap-[3.2rem] lg:h-136 lg:mt-0">
      {/* lg:h-[34rem] */}
      <div className="flex flex-col py-[3.2rem] px-[1.6rem] sm:px-[3.2rem] bg-neutral-0 w-full gap-[3.2rem] border border-blue-100 rounded-[1.6rem] sm:h-136 sm:justify-between sm:relative sm:overflow-hidden lg:w-[58%]">
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-preset-3 opacity-70 font-bold m-0">
            I&apos;m feeling
          </h2>
          <h1 className="text-preset-2 font-bold ">{moodLabel}</h1>
        </div>

        {SelectedIcon && (
          <SelectedIcon className="w-[20rem] h-80 m-auto sm:absolute sm:-bottom-14 sm:right-[33px] sm:w-[320px] sm:h-[320px]" />
        )}

        <div className="flex flex-col items-center gap-[1.6rem] sm:items-start">
          <QuotesIcon className="m-auto w-[2.4rem] h-[2.4rem] sm:m-0" />
          <blockquote className="text-preset-6-italic text-center text-neutral-900! font-medium sm:w-[24.6rem] sm:text-left">
            “{moodQuote}”
          </blockquote>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-1">
        <div className="flex flex-col p-8 bg-neutral-0 w-full gap-[3.2rem] border border-blue-100 rounded-[1.6rem]">
          <div className="flex gap-[1.2rem]">
            <ZzzIcon className=" w-[2.2rem] h-[2.2rem] text-neutral-600" />
            <p className="text-preset-6 text-neutral-600">Sleep</p>
          </div>
          <h1 className="text-preset-3 font-bold">{hoursOfSleep}</h1>
        </div>
        <div className="flex flex-col p-8 bg-neutral-0 w-full gap-[1.6rem] border border-blue-100 rounded-[1.6rem] lg:flex-1">
          <div className="flex items-center gap-[1.2rem]">
            <ReflectionsIcon className=" w-[2.2rem] h-[2.2rem] text-neutral-600" />
            <p className="text-preset-6 text-neutral-600">
              Reflection of the day
            </p>
          </div>
          <p className="text-preset-6 h-32 text-neutral-900 font-medium lg:flex-1 ">
            {reflection}
          </p>
          <div className="flex flex-wrap gap-[1.2rem] ">
            {feelings.map((feeling) => (
              <span
                className="text-preset-6-italic text-neutral-600 break-all"
                key={feeling}
              >
                #{feeling}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
