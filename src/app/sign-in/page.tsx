"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../../public/assets/images/logo.svg";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type ClerkError = {
  errors: { message: string }[];
};

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!isLoaded) {
      return null;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/home");
      } else {
        console.log("Unexpected result:", result);
      }
    } catch (err: unknown) {
      const clerkErr = err as ClerkError;
      console.log(JSON.stringify(error, null, 2));
      setError(clerkErr.errors[0].message);
    }
  }

  return (
    <div className="flex flex-col items-center gap-[3.2rem] mt-[8rem]">
      <Image src={logo} alt="Logo" />

      <div className="card text-[1.8rem] leading-[140%] tracking-[-0.3px]  text-neutral-900 bg-neutral-0 py-[4rem] px-[1.6rem] mx-[1.6rem] rounded-[1.6rem] ">
        <h1 className="font-bold text-[2.8rem] leading-[130%] mb-[0.8rem]">
          Welcome back!
        </h1>
        <p className="text-neutral-600 pb-[3.2rem]">
          Log in to continue tracking your mood and sleep.
        </p>

        <form onSubmit={submit}>
          <div className="input-email flex flex-col gap-[0.8rem] mb-[2rem]">
            <label className="text-neutral-900">Email address</label>
            <input
              type="email"
              name="email"
              className="h-[4.9rem] border-[1px] border-neutral-300 rounded-[1rem] placeholder:text-neutral-600 px-[1.6rem]"
              placeholder="name@mail.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>
          <div className="input-password flex flex-col gap-[0.8rem] mb-[3.2rem]">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="h-[4.9rem] border-[1px] border-neutral-300 rounded-[1rem] px-[1.6rem]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="action-btn">
            <button
              type="submit"
              className="bg-blue-600 rounded-[1rem] text-neutral-0 w-[100%] h-[5.2rem]"
            >
              {/* {isLoaded ? "Loading..." : "Sign Up"} */}
              Sign Up
            </button>
          </div>
        </form>

        <div className="flex gap-[0.5rem] mt-[2rem] justify-center">
          <p className="text-neutral-600"> Haven&apos;t got an account? </p>
          <Link href="/sign-up">
            <button className="text-blue-600"> Sign Up.</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
