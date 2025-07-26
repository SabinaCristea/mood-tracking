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

  return <button>{pending ? pendingLabel : children}</button>;
};
