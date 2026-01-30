"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./../../_styles/globals.css";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { Logo } from "@/src/_components/icons/Logo";
import { InfoIcon } from "@/src/_components/icons/InfoIcon";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const [loading, setLoading] = useState(false);

  let isPasswordError = false;
  let isEmailError = false;
  let isCodeError = false;
  if (errors && errors.length > 0) {
    isPasswordError = errors.some((err) => err.meta?.paramName === "password");
    isEmailError = errors.some(
      (err) => err.meta?.paramName === "email_address"
    );
    isCodeError = errors.some((err) => err.meta?.paramName === "code");
  }

  const emailErrorMessage = errors?.find(
    (err) => err.meta?.paramName === "email_address"
  )?.message;

  const passwordErrorMessage = errors?.find(
    (err) => err.meta?.paramName === "password"
  )?.message;

  const codeErrorMessage = errors?.find(
    (err) => err.meta?.paramName === "code"
  )?.message;

  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setErrors([]);

    if (!isLoaded) {
      return null;
    }

    setLoading(true);

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
      if (isClerkAPIResponseError(err)) {
        const formattedErrors = err.errors.map((e) => {
          if (
            e.code === "form_param_format_invalid" &&
            e.meta?.paramName === "email_address"
          ) {
            return {
              ...e,
              message: "Invalid email format",
              longMessage: "Invalid email format.",
            };
          }
          return e;
        });
        setErrors(formattedErrors);
      }
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-[3.2rem] mt-32">
      <Logo />

      <div className="card text-[1.8rem] leading-[140%] tracking-[-0.3px]  text-neutral-900 bg-neutral-0 py-16 px-[1.6rem] mx-[1.6rem] rounded-[1.6rem] ">
        <h1 className="font-bold text-[2.8rem] leading-[130%] mb-[0.8rem]">
          Create an account
        </h1>
        <p className="text-neutral-600 pb-[3.2rem]">
          Join to track your daily mood and sleep with ease.
        </p>
        {!verifying ? (
          <form onSubmit={submit}>
            <div className="input-email flex flex-col gap-[0.8rem] mb-8">
              <label className="text-neutral-900">Email address</label>
              <input
                type="email"
                name="email"
                className="h-[4.9rem] border border-neutral-300 rounded-2xl placeholder:text-neutral-600 px-[1.6rem] hover:border-neutral-600 outline-focus"
                placeholder="name@mail.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
                style={{ borderColor: isEmailError ? "red" : "" }}
              />
              {emailErrorMessage && (
                <ul>
                  {errors
                    ?.filter((el) => el.meta?.paramName === "email_address")
                    .map((el, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-[0.8rem]"
                      >
                        <InfoIcon />
                        <li className="text-red-500 text-[1.2rem] leading-[110%]">
                          {el.longMessage}
                        </li>
                      </div>
                    ))}
                </ul>
              )}
            </div>
            <div className="input-password flex flex-col gap-[0.8rem] mb-[3.2rem]">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="h-[4.9rem] border border-neutral-300 rounded-2xl px-[1.6rem] hover:border-neutral-600 outline-focus"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderColor: isPasswordError ? "red" : "" }}
              />
              {passwordErrorMessage && (
                <ul>
                  {errors
                    ?.filter((el) => el.meta?.paramName === "password")
                    .map((el, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-[0.8rem]"
                      >
                        <InfoIcon />
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
                disabled={loading}
                className=" bg-blue-600 rounded-2xl text-neutral-0 w-full h-[5.2rem] hover:bg-blue-700 hover:cursor-pointer outline-focus"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <div id="clerk-captcha"></div>
          </form>
        ) : (
          <form onSubmit={onPressVerify}>
            <div className="flex flex-col gap-[0.8rem] mb-[3.2rem]">
              <label htmlFor="code">Verification Code</label>
              <input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                required
                className="h-[4.9rem] border border-neutral-300 rounded-2xl px-[1.6rem] hover:border-neutral-600 outline-focus"
                style={{ borderColor: isCodeError ? "red" : "" }}
              />
              {codeErrorMessage && (
                <ul>
                  {errors?.map((el, index) => (
                    <div key={index} className="flex items-start gap-[0.8rem]">
                      <InfoIcon />
                      <li className="text-red-500 text-[1.2rem] leading-[110%]">
                        {el.longMessage}
                      </li>
                    </div>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 rounded-2xl text-neutral-0 w-full h-[5.2rem] hover:bg-blue-700 hover:cursor-pointer outline-focus"
            >
              {loading ? "Loading..." : "Verify email"}
            </button>
          </form>
        )}
        <div className="flex gap-2 mt-8 justify-center">
          <p className="text-neutral-600"> Already got an account? </p>
          <Link href="/sign-in">
            <button className="text-blue-600 hover:cursor-pointer">
              Log In.
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
