import React from "react";
import { AuthButton } from "./AuthButton";
import logo from "../../public/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

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
    <>
      <Image src={logo} alt="Logo" />
      <div className="auth-card">
        <h1>{title}</h1>
        <p>{subtitle}</p>
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
    </>
  );
};
