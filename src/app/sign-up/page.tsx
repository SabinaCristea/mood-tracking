"use client";

import React, { useState } from "react";
import logo from "../../../public/assets/images/logo.svg";
import infoIcon from "../../../public/assets/images/info-circle.svg";
import Image from "next/image";
import Link from "next/link";
import "./../../_styles/globals.css";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  let isPasswordError = false;
  if (errors && errors.length > 0) {
    isPasswordError = errors[0].meta?.paramName === "password";
  }
  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setErrors([]);

    if (!isLoaded) {
      return null;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignup.status !== "complete") {
        console.log(JSON.stringify(completeSignup, null, 2));
      }

      if (completeSignup.status === "complete") {
        await setActive({ session: completeSignup.createdSessionId });
        router.push("/onboarding");
      }
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <div className="flex flex-col items-center gap-[3.2rem] mt-[8rem]">
      <Image src={logo} alt="Logo" />

      <div className="card text-[1.8rem] leading-[140%] tracking-[-0.3px]  text-neutral-900 bg-neutral-0 py-[4rem] px-[1.6rem] mx-[1.6rem] rounded-[1.6rem] ">
        <h1 className="font-bold text-[2.8rem] leading-[130%] mb-[0.8rem]">
          Create an account
        </h1>
        <p className="text-neutral-600 pb-[3.2rem]">
          Join to track your daily mood and sleep with ease.
        </p>
        {!verifying ? (
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
              {isPasswordError && (
                <ul>
                  {errors.map((el, index) => (
                    <div key={index} className="flex items-start gap-[0.8rem]">
                      <Image src={infoIcon} alt="Info icon" />
                      <li className="text-red-500 text-[1.2rem] leading-[110%]">
                        {el.longMessage}
                      </li>
                    </div>
                  ))}
                </ul>
              )}
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
            <div id="clerk-captcha"></div>
          </form>
        ) : (
          <form onSubmit={onPressVerify}>
            <div>
              <label htmlFor="code">Verification Code</label>
              <input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                required
              />
            </div>
            <button type="submit">Verify email</button>
          </form>
        )}
        <div className="flex gap-[0.5rem] mt-[2rem] justify-center">
          <p className="text-neutral-600"> Already got an account? </p>
          <Link href="/sign-in">
            <button className="text-blue-600"> Log In.</button>
          </Link>
        </div>
      </div>

      {/* {errors && (
        <ul>
          {errors.map((el, index) => (
            <div key={index} className="flex items-start gap-[0.8rem]">
              <Image src={infoIcon} alt="Info icon" />
              <li className="text-red-500 text-[1.2rem] leading-[110%]">
                {el.longMessage}
              </li>
            </div>
          ))}
        </ul>
      )} */}
    </div>
  );
}
