"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ClipLoader } from "react-spinners";
import dropdownArrow from "../../public/assets/images/icon-dropdown-arrow.svg";
import placeholderImage from "../../public/assets/images/avatar-placeholder.svg";
import settingsIcon from "../../public/assets/images/icon-settings.svg";
import logoutIcon from "../../public/assets/images/icon-logout.svg";
import Image from "next/image";
import type { UserResource } from "@clerk/types";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ProfileDetails } from "./ProfileDetails";

type UserProfileProps = {
  user: UserResource | null | undefined;
  isLoaded: boolean;
  isProfileDetailsOpen: boolean;
  setIsProfileDetailsOpen: Dispatch<SetStateAction<boolean>>;
};

export const UserProfile = ({
  user,
  isLoaded,
  isProfileDetailsOpen,
  setIsProfileDetailsOpen,
}: UserProfileProps) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { signOut } = useAuth();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const avatarSrc = user?.imageUrl ?? placeholderImage;
  const emailAddress = user?.emailAddresses[0].emailAddress;
  const fullName = user?.fullName;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!isLoaded || !user) return null;

  if (!isLoaded)
    return (
      <div className="flex items-center">
        <ClipLoader size={24} speedMultiplier={0.5} color="#2563eb" />
      </div>
    );

  return (
    <>
      <div className="relative flex items-center">
        <button
          className="flex gap-4 hover:cursor-pointer outline-focus "
          onClick={() => {
            setIsProfileDropdownOpen(true);
          }}
        >
          <div className="rounded-full overflow-hidden w-[4rem] h-[4rem]">
            <Image
              src={avatarSrc}
              width={40}
              height={40}
              className=" object-cover object-center w-full h-full"
              alt={fullName ?? "User avatar"}
            />
          </div>
          <Image src={dropdownArrow} alt="arrow down" />
        </button>
        {isProfileDropdownOpen && (
          <div
            ref={dropdownRef}
            className="bg-neutral-0 absolute right-0 top-20 w-120 sm:w-100 px-[1.6rem] py-[1.2rem] rounded-[0.8rem] drop-shadow-[0_5px_8px_#21214D16]"
          >
            <h1 className="text-preset-6 truncate">{fullName}</h1>
            <p className="text-preset-7 text-neutral-300 pb-[1.2rem] truncate">
              {emailAddress}
            </p>
            <hr className="pt-[1.2rem] border-blue-100 " />
            <button
              className="flex items-center gap-4 hover:cursor-pointer outline-focus"
              onClick={() => {
                setIsProfileDropdownOpen(false);
                setIsProfileDetailsOpen(true);
              }}
            >
              <Image
                src={settingsIcon}
                alt="Setting Icon"
                width={16}
                height={16}
              />
              <p className="text-preset-7">Settings</p>
            </button>

            <button
              className="flex items-center gap-4 mt-[1.2rem] hover:cursor-pointer outline-focus"
              onClick={() => {
                signOut();
                router.push("/sign-in");
              }}
            >
              <Image src={logoutIcon} alt="Logout Icon" />
              <p className="text-preset-7">Logout</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
