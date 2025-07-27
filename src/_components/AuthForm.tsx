import React from "react";
import { AuthButton } from "./AuthButton";
import logo from "../../public/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import "./../_styles/globals.css";

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
  return (
    <div className="flex flex-col items-center gap-[3.2rem] mt-[8rem]">
      <Image src={logo} alt="Logo" className="" />

      <div className="card text-[1.8rem] leading-[140%] text-neutral-900 bg-neutral-0 py-[4rem] px-[1.6rem] mx-[1.6rem] rounded-[1.6rem] tracking-[-0.3px] ">
        <h1 className=" font-bold text-[2.8rem] leading-[130%]">{title}</h1>

        <p className="text-neutral-600  pb-[3.2rem]">{subtitle}</p>
        <form action="">
          <div className="input-email flex flex-col">
            <label className="text-neutral-900">Email address</label>
            <input name="email" />
          </div>
          <div className="input-password flex flex-col">
            <label>Password</label>
            <input name="password" />
          </div>
          <div className="action-btn">
            <AuthButton pendingLabel="Loading...">{buttonText}</AuthButton>
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
