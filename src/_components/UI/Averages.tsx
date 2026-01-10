import Image from "next/image";
import React from "react";
import pattern from "../../../public/assets/images/bg-pattern-averages.svg";

export const Averages = () => {
  const moodcheckins = [];
  const sleepcheckins = [];

  const moodData =
    moodcheckins.length >= 5
      ? { title: "Great Progress!", text: "Your average mood is stable." }
      : {
          title: "Keep tracking!",
          text: "Log 5 check-ins to see your average mood.",
        };

  const sleepData =
    sleepcheckins.length >= 5
      ? { title: "Sleep Analysis", text: "You're averaging 8 hours." }
      : {
          title: "Not enough data yet!",
          text: "Track 5 nights to view average sleep.",
        };

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
          <p className="text-neutral-600 text-[1.5rem] leading-[140%]">
            Log 5 check-ins to see your average mood.
          </p>
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
        <div className="bg-blue-100 rounded-[1.6rem] flex flex-col gap-[1.2rem] justify-center h-60 px-[1.6rem] py-8 relative overflow-hidden lg:p-8 ">
          <h4 className="text-[2.4rem] leading-[140%] font-semibold ">
            Not enough data yet!
          </h4>
          <p className="text-neutral-600 text-[1.5rem] leading-[140%]">
            Track 5 nights to view average sleep.
          </p>
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
