import React from "react";
import CardBarChart from "../charts/MoodChart";

export const MoodSleepTrends = () => {
  return (
    <div className="mt-[3.2rem] bg-neutral-0 px-[1.6rem] sm:px-[2.4rem] py-8 rounded-[1.6rem] w-full mx-auto lg:w-[76.8rem] lg:mt-0 ">
      <h1 className="text-preset-3 font-bold mb-[3.2rem]">
        Mood and sleep trends
      </h1>
      <CardBarChart />
    </div>
  );
};
