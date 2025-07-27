"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export const AuthButton = ({
  children,
  pendingLabel,
}: {
  children: React.ReactNode;
  pendingLabel: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button className="bg-blue-600 rounded-[1rem] text-neutral-0 w-[100%] h-[5.2rem]">
      {pending ? pendingLabel : children}
    </button>
  );
};
