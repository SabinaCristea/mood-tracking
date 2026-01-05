import { MOOD_ICONS } from "@/_lib/helpers/moodFaces";
import Image from "next/image";
import React from "react";
import QuotesIcon from "../../public/assets/images/icon-quote.svg";
import { ZzzIcon } from "@/icons/ZzzIcon";
import { ReflectionsIcon } from "@/icons/ReflectionsIcon";

export const TodayMoodSummary = ({
  moodLabel,
  moodOrder,
  moodQuote,
  hoursOfSleep,
  reflection,
  feelings,
}: {
  moodLabel: string | undefined;
  moodOrder: number;
  moodQuote: string | undefined;
  hoursOfSleep: string | undefined;
  reflection: string;
  feelings: string[];
}) => {
  return (
    <div className="flex flex-col gap-[2rem] mb-[-1.6rem] mt-[1.6rem]">
      <div className="flex flex-col py-[3.2rem] px-[1.6rem] bg-neutral-0 w-full  gap-[3.2rem] border border-blue-100 rounded-[1.6rem]">
        <div className="flex flex-col items-center">
          <h2 className="text-preset-3 opacity-70 font-bold m-0">
            I&apos;m feeling
          </h2>
          <h1 className="text-preset-2 font-bold ">{moodLabel}</h1>
        </div>
        <Image
          src={MOOD_ICONS[moodOrder]}
          alt="emoji"
          className="w-[20rem] h-[20rem] m-auto "
        />
        <div className="flex flex-col items-center gap-[1.6rem]">
          <Image
            src={QuotesIcon}
            alt="quotes icon"
            className="m-auto w-[2.4rem] h-[2.4rem] "
          />
          <blockquote className="text-preset-6-italic text-center text-neutral-900!">
            “{moodQuote}”
          </blockquote>
        </div>
      </div>
      <div className="flex flex-col gap-[2rem]">
        <div className="flex flex-col p-[2rem] bg-neutral-0 w-full gap-[3.2rem] border border-blue-100 rounded-[1.6rem]">
          <div className="flex gap-[1.2rem]">
            <ZzzIcon className=" w-[2.2rem] h-[2.2rem] text-neutral-600" />
            <p className="text-preset-6 text-neutral-600">Sleep</p>
          </div>
          <h1 className="text-preset-3 font-bold">{hoursOfSleep}</h1>
        </div>
        <div className="flex flex-col p-[2rem] bg-neutral-0 w-full gap-[1.6rem] border border-blue-100 rounded-[1.6rem]">
          <div className="flex items-center gap-[1.2rem]">
            <ReflectionsIcon className=" w-[2.2rem] h-[2.2rem] text-neutral-600" />
            <p className="text-preset-6 text-neutral-600">
              Reflection of the day
            </p>
          </div>
          <p className="text-preset-6 h-[8rem] text-neutral-900">
            {reflection}
          </p>
          <div className="flex gap-[1.2rem]">
            {feelings.map((feeling, i) => (
              <span
                className="text-preset-6-italic text-neutral-600"
                key={feelings[i]}
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
