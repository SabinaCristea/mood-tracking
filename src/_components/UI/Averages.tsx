import Image from "next/image";
import React from "react";
import pattern from "../../../public/assets/images/bg-pattern-averages.svg";
import { calcTrend } from "@/_utils/calcTrend";
import { moodMessages, sleepMessages } from "@/_utils/trendMessages";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ArrowUp } from "../icons/ArrowUp";
import { ArrowDown } from "../icons/ArrowDown";
import { ArrowRight } from "../icons/ArrowRight";
import { ZzzIcon } from "../icons/ZzzIcon";

export const Averages = () => {
  const last6CheckIns = useQuery(api.moods.getLast6Moods.getLast6Moods);
  const lastMoodEntry = useQuery(api.moods.getLastMoodEntry.getLastMoodEntry);

  const lastMood = lastMoodEntry[0].mood.label.toLowerCase();
  const lastSleep = lastMoodEntry[0].sleep.label;

  console.log(lastMood, lastSleep);

  const moodValues = last6CheckIns
    ?.map((m) => m.mood?.order)
    .filter((v): v is number => v !== undefined);

  const sleepValues = last6CheckIns
    ?.map((s) => s.sleep?.order)
    .filter((v: number | undefined): v is number => v !== undefined)
    .map((v) => 6 - v);

  const moodTrend = calcTrend(moodValues);
  const sleepTrend = calcTrend(sleepValues);

  const setArrDirection = (trend: string) => {
    switch (trend) {
      case "improving":
        return <ArrowUp />;
      case "stable":
        return <ArrowRight />;
      case "declining":
        return <ArrowDown />;
      default:
        return "";
    }
  };

  const setMoodTrendBgColor = (mood: string) => {
    switch (mood) {
      case "very happy":
        return "FFC97C";
      case "happy":
        return "89E780";
      case "neutral":
        return "89CAFF";
      case "sad":
        return "B8B1FF";
      case "very sad":
        return "FF9B99";
      default:
        return "E0E6FA";
    }
  };

  const moodMessage = moodMessages[moodTrend];
  const sleepMessage = sleepMessages[sleepTrend];

  return (
    <div className="mt-[4.8rem] bg-white rounded-[1.6rem] flex flex-col gap-[2.4rem] px-[1.6rem]  py-8 w-full  xl:w-full mx-auto lg:p-[2.4rem] lg:mt-0">
      {/* average mood */}
      <div className="flex flex-col gap-[1.2rem]">
        <p className="text-[2rem] leading-[140%] font-semibold">
          Average Mood
          <span className="text-neutral-600 text-[1.5rem] leading-[140%] ">
            (Last 5 Check-ins)
          </span>
        </p>
        <div className="bg-blue-100 rounded-[1.6rem] flex flex-col gap-[1.2rem] justify-center h-60 px-[1.6rem] py-8 relative overflow-hidden lg:p-8 ">
          <h4 className="text-[2.4rem] leading-[140%] font-semibold ">
            Keep tracking!
          </h4>
          <div className="flex items-center gap-[0.8rem]">
            {setArrDirection(moodTrend)}
            <p className="text-neutral-600 text-[1.5rem] leading-[140%]">
              {/* Log 5 check-ins to see your average mood. */}
              {moodMessage}
            </p>
          </div>
          <Image
            src={pattern}
            alt="pattern"
            className="absolute z-50 -top-14 -right-76"
          />
        </div>
      </div>
      {/* average sleep */}
      <div className="flex flex-col gap-[1.2rem]">
        <p className="text-[2rem] leading-[140%] font-semibold">
          Average Sleep
          <span className="text-neutral-600 text-[1.5rem] leading-[140%]">
            (Last 5 Check-ins)
          </span>
        </p>
        <div
          className={`${sleepTrend === "needMoreData" ? "bg-blue-100" : "bg-blue-600"}  rounded-[1.6rem] flex flex-col gap-[1.2rem] justify-center h-60 px-[1.6rem] py-8 relative overflow-hidden lg:p-8 `}
        >
          {sleepTrend === "needMoreData" ? (
            <h4 className="text-[2.4rem] leading-[140%] font-semibold ">
              Not enough data yet!
            </h4>
          ) : (
            <div className="flex items-center gap-[1.6rem]">
              <ZzzIcon className="w-[2.4rem] h-[2.4rem] text-neutral-0 opacity-70" />
              <h3 className="text-preset-4 text-neutral-0  font-bold">
                {lastSleep}
              </h3>
            </div>
          )}
          <div className="flex items-center gap-[0.8rem]">
            {setArrDirection(sleepTrend)}
            <p
              className={`${sleepTrend === "needMoreData" ? "text-neutral-600" : "text-neutral-0 opacity-70"} text-[1.5rem] leading-[140%]`}
            >
              {/* Track 5 nights to view average sleep. */}
              {sleepMessage}
            </p>
          </div>
          <Image
            src={pattern}
            alt="pattern"
            className="absolute z-50 -top-14 -right-76"
          />
        </div>
      </div>
    </div>
  );
};
