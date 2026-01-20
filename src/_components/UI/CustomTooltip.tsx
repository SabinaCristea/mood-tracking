import React from "react";
import { HappyIcon } from "../icons/HappyIcon";
import { VeryHappyIcon } from "../icons/VeryHappyIcon";
import { VerySadIcon } from "../icons/VerySadIcon";
import { SadIcon } from "../icons/SadIcon";
import { NeutralIcon } from "../icons/NeutralIcon";

type TooltipPropTypes = {
  mood?: string | undefined;
  sleep?: string | null | undefined;
  reflection?: string | undefined;
  tags?: string[] | undefined;
};

export const CustomTooltip = ({
  mood,
  sleep,
  reflection,
  tags,
}: TooltipPropTypes) => {
  const getIconByMood = (mood: string | undefined) => {
    switch (mood) {
      case "Very Happy":
        return <VeryHappyIcon width={16} height={16} />;
      case "Happy":
        return <HappyIcon width={16} height={16} />;
      case "Neutral":
        return <NeutralIcon width={16} height={16} />;
      case "Sad":
        return <SadIcon width={16} height={16} />;
      case "Very Sad":
        return <VerySadIcon width={16} height={16} />;
    }
  };

  return (
    <div className="bg-neutral-0 w-70 p-[1.2rem] flex flex-col gap-[1.2rem] rounded-2xl shadow-[0_4px_7px_#21214D16] z-9999">
      <div className="flex flex-col gap-[0.8rem]">
        <h3 className="text-preset-8">Mood</h3>
        <div className="flex items-center gap-[0.6rem]">
          {getIconByMood(mood)}
          <p className="text-preset-7">{mood}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <h3 className="text-preset-8">Sleep</h3>
        <p className="text-preset-7">{sleep}</p>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <h3 className="text-preset-8">Reflection</h3>
        <p className="text-preset-9 font-semibold">{reflection}</p>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <h3 className="text-preset-8">Tags</h3>
        <p className="text-preset-9 font-semibold">{tags?.join(", ")}</p>
      </div>
    </div>
  );
};
