"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import logo from "../../../public/assets/images/logo.svg";
import Image from "next/image";
import { useState } from "react";
import placeholderImage from "../../../public/assets/images/avatar-placeholder.svg";
import dropdownArrow from "../../../public/assets/images/icon-dropdown-arrow.svg";
import pattern from "../../../public/assets/images/bg-pattern-averages.svg";
import formatDate from "@/_lib/helpers/formatDate";
import CardBarChart from "@/_components/MoodChart";
import { LogMoodModal } from "@/_components/LogMoodModal";

export default function HomePage() {
  const obj = useAuth();
  const { userId, signOut } = useAuth();
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState(placeholderImage);

  const [isLogOpen, setIsLogOpen] = useState(false);

  console.log(obj);

  const today = formatDate(new Date());

  console.log(isLogOpen);

  return (
    <>
      {isLogOpen && (
        <div className="bg-neutral-900 opacity-70 w-[100vw] h-[100vh] z-100 fixed"></div>
      )}
      <div className="pt-[4rem] px-[1rem] sm:px-[2rem] max-w-[34.3rem] sm:max-w-[70.4rem] lg:max-w-[117rem] mx-auto text-neutral-900 ">
        {/* <h1 className="text-2xl font-bold">
        Welcome {userId ? `User ${userId}` : "Guest"}
      </h1>
      <button
        onClick={() => {
          signOut();
          router.push("/sign-in");
        }}
      >
        Log out
      </button> */}
        {/* HEADER */}
        <div className="flex justify-between">
          <Image src={logo} alt="Logo" />
          <div className="flex gap-[1rem]">
            <Image src={imagePreview} alt="photo" width={40} height={40} />
            <Image src={dropdownArrow} alt="photo" />
          </div>
        </div>
        {/* CTA - SALUTATION */}
        <div className="flex flex-col w-full justify-center items-center mt-[4.8rem] gap-[1.6rem] sm:gap-[1rem] lg:mt-[6.4rem]">
          <h4 className="text-[2.8rem] md:text-[3.2rem] text-blue-600 leading-[130%] md:leading-[140%] tracking-[-0.3px] font-bold">
            {/* Hello, {userId}! */}
            Hello, Bina!
          </h4>

          <h1 className="text-[4.6rem] md:text-[5.2rem] leading-[120%] md:leading-[140%] tracking-[-2px] font-bold text-center">
            How are you feeling today?
          </h1>
          <p className="text-[1.8rem]  text-neutral-600 leading-[120%]">
            {today}
          </p>

          <button
            className="bg-blue-600 rounded-[1rem] text-neutral-0 text-[2rem] px-[3.2rem] h-[6rem] hover:bg-blue-700 hover:cursor-pointer outline-focus mt-[3.2rem] sm:mt-[4.8rem] lg:mt-[6.4rem]"
            onClick={() => setIsLogOpen((prev) => !prev)}
          >
            Log today&apos;s mood
          </button>
        </div>
        {isLogOpen && <LogMoodModal />}
        {/* lg:h-[45.3rem] */}
        <div className="flex flex-col lg:flex-row lg:gap-[3.2rem] lg:mt-[6.4rem] mb-[8rem]">
          {/* AVERAGE MOOD */}
          <div className="mt-[4.8rem] bg-white rounded-[1.6rem] flex flex-col gap-[2.4rem] px-[1.6rem] py-[2rem] w-[34.3rem] mx-auto md:w-[70.4rem]  lg:w-[45.3rem]  lg:p-[2.4rem] lg:mt-0">
            {/* average mood */}
            <div className="flex flex-col gap-[1.2rem]">
              <p className="text-[2rem] leading-[140%] font-semibold">
                Average Mood{" "}
                <span className="text-neutral-600 text-[1.5rem] leading-[140%] ">
                  (Last 5 Check-ins)
                </span>
              </p>
              <div className="bg-blue-100 rounded-[1.6rem] flex flex-col gap-[1.2rem] justify-center h-[15rem] px-[1.6rem] py-[2rem] relative overflow-hidden lg:p-[2rem] ">
                <h4 className="text-[2.4rem] leading-[140%] font-semibold ">
                  Keep tracking!
                </h4>
                <p className="text-neutral-600 text-[1.5rem] leading-[140%]">
                  Log 5 check-ins to see your average mood.
                </p>
                <Image
                  src={pattern}
                  alt="pattern"
                  className="absolute z-[100] top-[-3.5rem] right-[-19rem]"
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
              <div className="bg-blue-100 rounded-[1.6rem] flex flex-col gap-[1.2rem] justify-center h-[15rem] px-[1.6rem] py-[2rem] relative overflow-hidden lg:p-[2rem] ">
                <h4 className="text-[2.4rem] leading-[140%] font-semibold ">
                  Not enough data yet!
                </h4>
                <p className="text-neutral-600 text-[1.5rem] leading-[140%]">
                  Track 5 nights to view average sleep.
                </p>
                <Image
                  src={pattern}
                  alt="pattern"
                  className="absolute z-[100] top-[-3.5rem] right-[-19rem]"
                />
              </div>
            </div>
          </div>

          {/* MOOD AND SLEEP TRENDS */}
          <div className="mt-[3.2rem] bg-neutral-0 px-[1.6rem] py-[2rem] rounded-[1.6rem] w-[34.3rem] mx-auto md:w-[70.4rem]  lg:mt-0">
            <h1>Mood and sleep trends</h1>
            <CardBarChart />
          </div>
        </div>
      </div>
    </>
  );
}
