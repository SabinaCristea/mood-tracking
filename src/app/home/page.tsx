"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import logo from "../../../public/assets/images/logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import placeholderImage from "../../../public/assets/images/avatar-placeholder.svg";
import dropdownArrow from "../../../public/assets/images/icon-dropdown-arrow.svg";
import formatDate from "@/_lib/helpers/formatDate";

export default function HomePage() {
  const obj = useAuth();
  const { userId, signOut } = useAuth();
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState(placeholderImage);

  console.log(obj);

  const today = formatDate(new Date());

  return (
    <div className="pt-[4rem] max-w-[117rem] mx-auto">
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
      <div className="flex justify-between">
        <Image src={logo} alt="Logo" />
        <div className="flex gap-[1rem]">
          <Image src={imagePreview} alt="photo" width={40} height={40} />
          <Image src={dropdownArrow} alt="photo" />
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <h4>Hello, {userId}!</h4>

        <h1>How are you feeling today?</h1>
        <p>{today}</p>

        <button
          type="submit"
          className="bg-blue-600 rounded-[1rem] text-neutral-0 text-[2rem] px-[3.2rem] h-[6rem] hover:bg-blue-700 hover:cursor-pointer outline-focus"
        >
          Log today&apos;s mood
        </button>
      </div>
      <div></div>
    </div>
  );
}
