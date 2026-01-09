import React from "react";

export const Button = ({
  onClick,
  label,
  isFullWidth = false,
}: {
  onClick: () => void;
  label: string;
  isFullWidth?: boolean;
}) => {
  return (
    <button
      className={`bg-blue-600 rounded-[1rem] text-neutral-0 text-[2rem] px-[3.2rem] h-[6rem] hover:bg-blue-700 hover:cursor-pointer outline-focus ${isFullWidth ? "w-full" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
