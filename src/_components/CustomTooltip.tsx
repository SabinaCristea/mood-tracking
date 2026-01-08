import React from "react";

export const CustomTooltip = ({ mood, sleep, reflection, tags }) => {
  return (
    <div className="bg-neutral-0 w-70 p-[1.2rem] flex flex-col gap-[1.2rem] rounded-2xl shadow-[0_4px_7px_#21214D16] z-1000">
      <div className="flex flex-col gap-[0.8rem]">
        <h3 className="text-preset-8">Mood</h3>
        <p className="text-preset-7">{mood}</p>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <h3 className="text-preset-8">Sleep</h3>
        <p className="text-preset-7">{sleep}</p>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <h3 className="text-preset-8">Reflection</h3>
        <p className="text-preset-7">{reflection}</p>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <h3 className="text-preset-8">Tags</h3>
        <p className="text-preset-7">{tags}</p>
      </div>
    </div>
  );
};
