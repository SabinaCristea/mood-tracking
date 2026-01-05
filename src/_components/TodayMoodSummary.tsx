import { MOOD_ICONS } from "@/_lib/helpers/moodFaces";
import Image from "next/image";
import React from "react";
import QuotesIcon from "../../public/assets/images/icon-quote.svg";
import ZzzIcon from "../../public/assets/images/icon-sleep.svg";
import StarIcon from "../../public/assets/images/icon-reflection.svg";

export const TodayMoodSummary = ({
  moodLabel,
  moodOrder,
  moodQuote,
  hoursOfSleep,
  reflection,
  feelings,
}: {
  moodLabel: string;
  moodOrder: number;
  moodQuote: string;
  hoursOfSleep: string;
  reflection: string;
  feelings: string[];
}) => {
  return (
    <div>
      <div className="">
        <h2>I&apos;m feeling</h2>
        <h1>{moodLabel}</h1>
        <Image
          src={MOOD_ICONS[moodOrder]}
          alt="emoji"
          className="w-[3.8rem] h-[3.8rem] ml-auto"
        />
        <Image src={QuotesIcon} alt="quotes icon" className="" />

        <blockquote>{moodQuote}</blockquote>
      </div>
      <div>
        <div>
          <div>
            <Image src={ZzzIcon} alt="sleep icon" className="" />
            <p>Sleep</p>
          </div>
          {hoursOfSleep}
        </div>
        <div>
          <div>
            <Image src={StarIcon} alt="star icon" className="" />
            <p>Reflection of the day</p>
          </div>
          <p>{reflection}</p>
          {feelings.map((feeling, i) => (
            <span key={feelings[i]}>#{feeling} </span>
          ))}
        </div>
      </div>
    </div>
  );
};
