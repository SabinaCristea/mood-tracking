import { AuthForm } from "@/_components/AuthForm";
import React from "react";

export default function Page() {
  return (
    <div>
      <AuthForm
        title="Create an account"
        subtitle="Join to track your daily mood and sleep with ease."
        buttonText="Sign Up"
        footerMsg="Already got an account? "
        footerAction=" Log In."
        footerHref="/login"
      />
    </div>
  );
}
