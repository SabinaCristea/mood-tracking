import Image from "next/image";
import React from "react";
import pattern from "../../../public/assets/images/bg-pattern-averages.svg";
import { moodMessages, sleepMessages } from "@/src/_utils/trendMessages";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowUp } from "../icons/ArrowUp";
import { ArrowDown } from "../icons/ArrowDown";
import { ArrowRight } from "../icons/ArrowRight";
import { ZzzIcon } from "../icons/ZzzIcon";
import { MOOD_ICONS, MOOD_ICONS_WHITE } from "@/src/_lib/helpers/moodFaces";
import { calcTrend } from "@/src/_utils/calcTrend";

export const Averages = () => {
  const last6CheckIns = useQuery(api.moods.getLast6Moods.getLast6Moods);

  const todayDateString = new Date().toDateString();

  const hasLoggedToday = last6CheckIns?.some(
    (entry) => new Date(entry.createdAt).toDateString() === todayDateString
  );

  const latestEntry = last6CheckIns?.[0];
  const lastMoodLabel = latestEntry?.mood?.label;
  const lastMoodOrder = latestEntry?.mood?.order;
  const lastSleepLabel = latestEntry?.sleep?.label;

  const moodEntries =
    last6CheckIns
      ?.filter((m) => m.mood !== null)
      .map((m) => ({
        value: m.mood!.order,
        createdAt: m.createdAt,
      })) || [];

  const sleepEntries =
    last6CheckIns
      ?.filter((s) => s.sleep !== null)
      .map((s) => ({
        value: 6 - s.sleep!.order,
        createdAt: s.createdAt,
      })) || [];

  const moodTrend = calcTrend(moodEntries);
  const sleepTrend = calcTrend(sleepEntries);

  const isDataComplete = hasLoggedToday && moodTrend !== "needMoreData";

  const setArrDirection = (trend: string, color: string) => {
    switch (trend) {
      case "improving":
        return <ArrowUp className={color} />;
      case "stable":
        return <ArrowRight className={color} />;
      case "declining":
        return <ArrowDown className={color} />;
      default:
        return "";
    }
  };

  const setMoodTrendBgColor = (mood: string | undefined) => {
    switch (mood) {
      case "Very Happy":
        return "bg-amber-300";
      case "Happy":
        return "bg-green-300";
      case "Neutral":
        return "bg-blue-300";
      case "Sad":
        return "bg-indigo-200";
      case "Very Sad":
        return "bg-red-300";
      default:
        return "bg-blue-100";
    }
  };

  const moodLabelForBg = isDataComplete ? lastMoodLabel : undefined;

  const moodMessage = moodMessages[moodTrend];
  const sleepMessage = sleepMessages[sleepTrend];

  const MoodIcon = MOOD_ICONS_WHITE[lastMoodOrder as keyof typeof MOOD_ICONS];

  return (
    <div className="mt-[4.8rem] bg-white rounded-[1.6rem] flex flex-col gap-[2.4rem] px-[1.6rem] py-8 w-full mx-auto lg:p-[2.4rem] lg:mt-0 lg:h-full xl:max-w-[37rem] xl:mx-0">
      {/* average mood */}
      <div className="flex flex-col gap-[1.2rem]">
        <p className="text-[2rem] leading-[140%] font-semibold">
          Average Mood{" "}
          <span className="text-neutral-600 text-[1.5rem] leading-[140%] ">
            (Last 5 Check-ins)
          </span>
        </p>
        <div
          className={`${setMoodTrendBgColor(moodLabelForBg)} rounded-[1.6rem] flex flex-col gap-[1.2rem] justify-center h-60 px-[1.6rem] py-8 relative overflow-hidden lg:p-8 `}
        >
          {moodTrend === "needMoreData" ? (
            <h4 className="text-[2.4rem] leading-[140%] font-semibold ">
              Keep tracking!
            </h4>
          ) : (
            <div className="flex items-center gap-[1.2rem]">
              <MoodIcon className="w-[2.4rem]" />
              <h2 className="text-preset-4 font-semibold">{lastMoodLabel}</h2>
            </div>
          )}
          <div className="flex items-start gap-[0.8rem]">
            {setArrDirection(moodTrend, "text-neutral-900")}
            <p
              className={` ${moodTrend === "needMoreData" ? "text-neutral-600" : "text-neutral-900"}  text-[1.5rem] leading-[140%] pr-16`}
            >
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
          Average Sleep{" "}
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
              <h3 className="text-preset-4 text-neutral-0  font-semibold">
                {lastSleepLabel}
              </h3>
            </div>
          )}
          <div className="flex items-center gap-[0.8rem]">
            {setArrDirection(sleepTrend, "text-neutral-0 opacity-70")}
            <p
              className={`${sleepTrend === "needMoreData" ? "text-neutral-600" : "text-neutral-0 opacity-70"} text-[1.5rem] leading-[140%] pr-16`}
            >
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
