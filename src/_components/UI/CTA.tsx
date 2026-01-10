import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";
import formatDate from "@/_lib/helpers/formatDate";

const today = formatDate(new Date());

type ctaTypes = {
  firstName: string | undefined | null;
  todayMood: object | null;
  setIsLogOpen: Dispatch<SetStateAction<boolean>>;
};

export const CTA = ({ firstName, todayMood, setIsLogOpen }: ctaTypes) => {
  return (
    <div className="flex flex-col w-full justify-center items-center mt-[4.8rem] gap-[1.6rem]  sm:gap-4 lg:mt-[6.4rem]">
      <h4 className="text-[2.8rem] md:text-[3.2rem] text-blue-600 leading-[130%] md:leading-[140%] tracking-[-0.3px] font-bold">
        Hello, {firstName}!
      </h4>

      <h1 className="text-[4.6rem] md:text-[5.2rem] leading-[120%] md:leading-[140%] tracking-[-2px] font-bold text-center">
        How are you feeling today?
      </h1>
      <p className="text-[1.8rem]  text-neutral-600 leading-[120%] mb-[3.2rem] sm:mb-[4.8rem] lg:mb-[6.4rem]">
        {today}
      </p>

      {todayMood === null && (
        <Button
          onClick={() => setIsLogOpen((prev: boolean) => !prev)}
          label="Log today's mood"
        />
      )}
    </div>
  );
};
