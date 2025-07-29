"use client";

import React, { useState } from "react";
import { AuthButton } from "./AuthButton";
import logo from "../../public/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import "./../_styles/globals.css";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const AuthForm = ({
  title,
  subtitle,
  buttonText,
  footerMsg,
  footerAction,
  footerHref,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  footerMsg: string;
  footerAction: string;
  footerHref: string;
}) => {
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (buttonText === "Log In") {
        if (!signInLoaded) return;
        const result = await signIn.create({
          identifier: email,
          password,
        });

        if (result.status === "complete") {
          router.push("/home");
        } else {
          console.log(result);
        }
      } else if (buttonText === "Sign Up") {
        if (!signUpLoaded) return;
        const result = await signUp.create({
          emailAddress: email,
          password,
        });

        if (result.status === "complete") {
          router.push("/test");
        } else {
          console.log(result);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[3.2rem] mt-[8rem]">
      <Image src={logo} alt="Logo" className="" />

      <div className="card text-[1.8rem] leading-[140%] tracking-[-0.3px]  text-neutral-900 bg-neutral-0 py-[4rem] px-[1.6rem] mx-[1.6rem] rounded-[1.6rem] ">
        <h1 className="font-bold text-[2.8rem] leading-[130%] mb-[0.8rem]">
          {title}
        </h1>
        <p className="text-neutral-600 pb-[3.2rem]">{subtitle}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-email flex flex-col gap-[0.8rem] mb-[2rem]">
            <label className="text-neutral-900">Email address</label>
            <input
              name="email"
              className="h-[4.9rem] border-[1px] border-neutral-300 rounded-[1rem] placeholder:text-neutral-600 px-[1.6rem]"
              placeholder="name@mail.com"
            />
          </div>
          <div className="input-password flex flex-col gap-[0.8rem] mb-[3.2rem]">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="h-[4.9rem] border-[1px] border-neutral-300 rounded-[1rem] px-[1.6rem]"
            />
          </div>
          <div className="action-btn">
            <AuthButton pendingLabel="Loading..." isPending={loading}>
              {buttonText}
            </AuthButton>
          </div>
        </form>
        <div className="flex gap-[0.5rem] mt-[2rem] justify-center">
          <p className="text-neutral-600"> {footerMsg}</p>
          <Link href={footerHref}>
            <button className="text-blue-600">{footerAction}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
