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

  return (
    <button
      type="submit"
      className="bg-blue-600 rounded-2xl text-neutral-0 w-full h-[5.2rem]"
      disabled={isPending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
};
