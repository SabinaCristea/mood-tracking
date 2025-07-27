import { AuthForm } from "@/_components/AuthForm";
import React from "react";

export default function Page() {
  return (
    <div>
      <AuthForm
        title="Welcome back!"
        subtitle="Log in to continue tracking your mood and sleep."
        buttonText="Log In"
        footerMsg="Haven't got an account?"
        footerAction=" Sign up."
        footerHref="/signup"
      />
    </div>
  );
}
