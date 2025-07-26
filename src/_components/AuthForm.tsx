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

      <div className="card bg-neutral-0 py-[4rem] px-[1.6rem] mx-[1.6rem] rounded-[1.6rem] tracking-[-0.3px]">
        <h1 className="text-neutral-900 font-bold text-[2.8rem]  leading-[130%]">
          {title}
        </h1>

        <p className="text-neutral-600 text-[1.8rem] leading-[140%]">
          {subtitle}
        </p>
        <form action="">
          <div className="input-email">
            <label>Email address</label>
            <input name="email" />
          </div>
          <div className="input-password">
            <label>Password</label>
            <input name="password" />
          </div>
          <div className="action-btn">
            <AuthButton pendingLabel="Loading...">{buttonText}</AuthButton>
          </div>
        </form>
        <div>
          <p>{footerMsg}</p>
          <Link href={footerHref}>
            <button>{footerAction}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
