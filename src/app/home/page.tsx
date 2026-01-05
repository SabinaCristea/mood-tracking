"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import logo from "../../../public/assets/images/logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import pattern from "../../../public/assets/images/bg-pattern-averages.svg";
import formatDate from "@/_lib/helpers/formatDate";
import CardBarChart from "@/_components/MoodChart";
import { LogMoodModal } from "@/_components/LogMoodModal";
import { Button } from "@/_components/Button";
import { UserProfile } from "@/_components/UserProfile";
import { ProfileDetails } from "@/_components/ProfileDetails";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { TodayMoodSummary } from "@/_components/TodayMoodSummary";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth();

  const { user, isLoaded: isUserLoaded } = useUser();
  const [isLogOpen, setIsLogOpen] = useState(false);

  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);

  const router = useRouter();

  const today = formatDate(new Date());

  const firstName = user?.firstName;

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const todayMood = useQuery(api.moods.moods.getMoodForToday);

  if (todayMood === undefined) {
    // query still loading
    return null; // or a spinner/skeleton
  }


  console.log(todayMood);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      {(isLogOpen || isProfileDetailsOpen) && (
        <div className="transparent-overlay"></div>
      )}
      <div className="pt-16 px-[1.6rem] sm:px-[3.2rem]  w-full xl:max-w-500 2xl:max-w-520 mx-auto text-neutral-900 ">
        {/* HEADER */}
        <div className="flex justify-between">
          <Image src={logo} alt="Logo" />
          <UserProfile
            user={user}
            isLoaded={isUserLoaded}
            isProfileDetailsOpen={isProfileDetailsOpen}
            setIsProfileDetailsOpen={setIsProfileDetailsOpen}
          />
        </div>
        {/* CTA - SALUTATION */}
        <div className="flex flex-col w-full justify-center items-center mt-[4.8rem] gap-[1.6rem]  sm:gap-4 lg:mt-[6.4rem]">
          <h4 className="text-[2.8rem] md:text-[3.2rem] text-blue-600 leading-[130%] md:leading-[140%] tracking-[-0.3px] font-bold">
            {/* Hello, {userId}! */}
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
              onClick={() => setIsLogOpen((prev) => !prev)}
              label="Log today's mood"
            />
          )}
        </div>

        {isLogOpen && <LogMoodModal setOpen={setIsLogOpen} />}

        {todayMood && (
          <TodayMoodSummary
            moodLabel={todayMood?.mood?.label}
            moodOrder={todayMood?.mood?.order}
            moodQuote={todayMood?.randomQuote?.text}
            hoursOfSleep={todayMood?.sleep?.label}
            reflection={todayMood.note}
            feelings={todayMood.feeling}
          />
        )}

        <div className="flex flex-col lg:flex-row lg:gap-[3.2rem] lg:mt-[6.4rem] mb-32">
          {/* AVERAGE MOOD */}
          <div className="mt-[4.8rem] bg-white rounded-[1.6rem] flex flex-col gap-[2.4rem] px-[1.6rem]  py-8 w-full  xl:w-full mx-auto lg:p-[2.4rem] lg:mt-0">
            {/* average mood */}
            <div className="flex flex-col gap-[1.2rem]">
              <p className="text-[2rem] leading-[140%] font-semibold">
                Average Mood{" "}
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

          {/* MOOD AND SLEEP TRENDS */}
          <div className="mt-[3.2rem] bg-neutral-0 px-[1.6rem] py-8 rounded-[1.6rem] w-full mx-auto lg:w-[76.8rem]  lg:mt-0 ">
            <h1>Mood and sleep trends</h1>
            <CardBarChart />
          </div>
        </div>
      </div>
      {isProfileDetailsOpen && (
        <ProfileDetails
          title="Update your profile"
          description="Personalize your account with your name and photo."
          setIsProfileDetailsOpen={setIsProfileDetailsOpen}
          saveBtnText="Save Changes"
        />
      )}
    </>
  );
}
