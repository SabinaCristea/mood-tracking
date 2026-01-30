"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { LogMoodModal } from "@/src/_components/UI/LogMoodModal";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserProfile } from "@/src/_components/UI/UserProfile";
import { TodayMoodSummary } from "@/src/_components/UI/TodayMoodSummary";
import { ProfileDetails } from "@/src/_components/UI/ProfileDetails";
import { MoodSleepTrends } from "@/src/_components/UI/MoodSleepTrends";
import { Averages } from "@/src/_components/UI/Averages";
import { CTA } from "@/src/_components/UI/CTA";
import { Logo } from "@/src/_components/icons/Logo";

/// comments, readme file, how to deploy
export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth();

  const { user, isLoaded: isUserLoaded } = useUser();
  const [isLogOpen, setIsLogOpen] = useState(false);

  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);

  const router = useRouter();

  const firstName = user?.firstName;

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const todayMood = useQuery(api.moods.moods.getMoodForToday);

  if (todayMood === undefined) {
    // query still loading
    return null;
  }

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
          <Logo />
          <UserProfile
            user={user}
            isLoaded={isUserLoaded}
            isProfileDetailsOpen={isProfileDetailsOpen}
            setIsProfileDetailsOpen={setIsProfileDetailsOpen}
          />
        </div>
        {/* CTA - SALUTATION */}
        <CTA
          firstName={firstName}
          todayMood={todayMood}
          setIsLogOpen={setIsLogOpen}
        />

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

        <div className="flex flex-col  lg:flex-row lg:gap-[3.2rem] lg:mt-20 mb-32">
          <div className="flex-1 lg:flex-2 xl:flex-none">
            <Averages />
          </div>
          <div className="flex-1 lg:flex-3 min-w-0 xl:w-full">
            <MoodSleepTrends />
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
