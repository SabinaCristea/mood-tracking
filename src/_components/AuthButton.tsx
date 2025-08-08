"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export const AuthButton = ({
  children,
  pendingLabel,
  isPending,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  isPending: boolean;
}) => {
  const { pending } = useFormStatus();

  //console.log(pending);

  return (
    <button
      type="submit"
      className="bg-blue-600 rounded-[1rem] text-neutral-0 w-[100%] h-[5.2rem]"
      disabled={isPending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
};
