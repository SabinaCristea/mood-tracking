import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { LogMoodStep1 } from "./LogMoodStep1";

export const LogMoodModal = () => {
  const [step, setStep] = useState(0);

  return (
    <dialog
      open
      className="flex flex-col gap-[2.4rem] top-[5rem] bg-gradient-to-br from-white from-0% via-[#F5F5FF] via-[73%] to-[#E0E0FF] to-100% mx-auto z-100 w-[85%] h-[70.7rem] sm:h-[74.7rem] rounded-[1.6rem] px-[2rem] py-[3.2rem]"
    >
      <h1 className="text-[2.8rem] md:text-[3.2rem] leading-[130%] md:leading-[140%] tracking-[-0.3px] font-bold ">
        Log your mood
      </h1>

      <Tabs selectedIndex={step} disabled onSelect={() => {}}>
        <TabList className="flex gap-[1.6rem] mb-[2.4rem]">
          <Tab
            className="bg-blue-200 rounded-full h-[6px] w-[25%]"
            selectedClassName="bg-blue-600"
          ></Tab>
          <Tab
            className="bg-blue-200 rounded-full h-[6px] w-[25%]"
            selectedClassName="bg-blue-600"
          ></Tab>
          <Tab
            className="bg-blue-200 rounded-full h-[6px] w-[25%]"
            selectedClassName="bg-blue-600"
          ></Tab>
          <Tab
            className="bg-blue-200 rounded-full h-[6px] w-[25%]"
            selectedClassName="bg-blue-600"
          ></Tab>
        </TabList>

        <TabPanel>
          <LogMoodStep1 onContinue={() => setStep(1)} />
        </TabPanel>
        <TabPanel>2 fjvhsfu</TabPanel>
        <TabPanel>3 fjvhsfu</TabPanel>
        <TabPanel>4 fjvhsfu</TabPanel>
      </Tabs>
    </dialog>
  );
};
// w-[33.5rem]
