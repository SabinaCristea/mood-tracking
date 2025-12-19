import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { LogMoodStep1 } from "./LogMoodStep1";
import { LogMoodStep2 } from "./LogMoodStep2";
import Image from "next/image";
import closeIcon from "/public/assets/images/close.svg";
import { LogMoodStep3 } from "./LogMoodStep3";

export const LogMoodModal = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [step, setStep] = useState(0);

  return (
    <dialog
      open
      className="flex flex-col gap-[2.4rem] top-[5rem] bg-gradient-to-br from-white from-0% via-[#F5F5FF] via-[73%] to-[#E0E0FF] to-100% mx-auto z-100 w-[85%]  rounded-[1.6rem] px-[2rem] py-[3.2rem] "
    >
      <button
        onClick={() => setOpen(false)}
        className="absolute top-[2rem]
    right-[1.5rem] outline-focus"
      >
        <Image
          src={closeIcon}
          alt="close btn"
          width={15}
          height={15}
          className="hover:cursor-pointer hover:opacity-50"
        />
      </button>
      <h1 className="text-[2.8rem] md:text-[3.2rem] leading-[130%] md:leading-[140%] tracking-[-0.3px] font-bold ">
        Log your mood
      </h1>

      <Tabs selectedIndex={step} disabled onSelect={() => {}}>
        <TabList className="flex gap-[1.6rem] mb-[2.4rem] ">
          {[0, 1, 2, 3].map((i) => (
            <Tab
              key={i}
              className={`rounded-full h-[6px] w-[25%] transition-colors
        ${i <= step ? "bg-blue-600" : "bg-blue-200"} outline-focus`}
              disabled
            />
          ))}
        </TabList>

        <TabPanel>
          <LogMoodStep1 onContinue={() => setStep(1)} />
        </TabPanel>
        <TabPanel>
          <LogMoodStep2 onContinue={() => setStep(2)} />
        </TabPanel>
        <TabPanel>
          <LogMoodStep3 onContinue={() => setStep(3)} />{" "}
        </TabPanel>
        <TabPanel>4 fjvhsfu</TabPanel>
      </Tabs>
    </dialog>
  );
};
// w-[33.5rem]
