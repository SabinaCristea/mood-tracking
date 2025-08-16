"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../../public/assets/images/logo.svg";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import infoIcon from "../../../public/assets/images/info-circle.svg";

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const [loading, setLoading] = useState(false);

  let isPasswordError = false;
  let isEmailError = false;

  if (errors && errors.length > 0) {
    isPasswordError = errors.some((err) => err.meta?.paramName === "password");
    isEmailError = errors.some((err) => err.meta?.paramName === "identifier");
  }

  const emailErrorMessage = errors?.find(
    (err) => err.meta?.paramName === "identifier"
  )?.message;

  const passwordErrorMessage = errors?.find(
    (err) => err.meta?.paramName === "password"
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
      if (isClerkAPIResponseError(err)) {
        const formattedErrors = err.errors.map((e) => {
          if (
            e.code === "form_password_incorrect" &&
            e.meta?.paramName === "password"
          ) {
            return {
              ...e,
              message: "Password is incorrect. Try again.",
              longMessage: "Password is incorrect. Try again.",
            };
          } else if (
            e.code === "form_identifier_not_found" &&
            e.meta?.paramName === "identifier"
          ) {
            return {
              ...e,
              message: "Email not registered.",
              longMessage: "Email not registered.",
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
              className="h-[4.9rem] border-[1px] border-neutral-300 rounded-[1rem] placeholder:text-neutral-600 px-[1.6rem] hover:border-neutral-600 outline-focus"
              placeholder="name@mail.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
              style={{ borderColor: isEmailError ? "red" : "" }}
            />
            {emailErrorMessage && (
              <ul>
                {errors
                  ?.filter((el) => el.meta?.paramName === "identifier")
                  .map((el, index) => (
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
          <div className="input-password flex flex-col gap-[0.8rem] mb-[3.2rem]">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="h-[4.9rem] border-[1px] border-neutral-300 rounded-[1rem] px-[1.6rem] hover:border-neutral-600 outline-focus"
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
              className="bg-blue-600 rounded-[1rem] text-neutral-0 w-[100%] h-[5.2rem] hover:bg-blue-700 hover:cursor-pointer outline-focus"
            >
              {loading ? "Loading..." : "Log In"}
            </button>
          </div>
        </form>

        <div className="flex gap-[0.5rem] mt-[2rem] justify-center">
          <p className="text-neutral-600"> Haven&apos;t got an account? </p>
          <Link href="/sign-up" className="outline-focus">
            <button className="text-blue-600 hover:cursor-pointer">
              Sign Up.
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
