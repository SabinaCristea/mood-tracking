import Image from "next/image";
import React from "react";
import VeryHappyface from "./../../public/assets/images/icon-very-happy-color.svg";
import Happyface from "./../../public/assets/images/icon-happy-color.svg";
import Neutralface from "./../../public/assets/images/icon-neutral-color.svg";
import Sadface from "./../../public/assets/images/icon-sad-color.svg";
import VerySadface from "./../../public/assets/images/icon-very-sad-color.svg";

export const LogMoodStep1 = () => {
  return (
    <div>
      <h1>How was your mood today?</h1>
      <section role="options" className="flex flex-col gap-[1.2rem]">
        <div className="option-1 bg-white px-[2rem] py-[1.2rem] flex gap-[1.2rem] items-center  border-[2px] border-blue-100 rounded-[1rem]">
          <div className="w-[2rem] h-[2rem] rounded-full border-[1.5px] border-blue-200"></div>
          <p className="text-left">Very Happy</p>
          <Image
            src={VeryHappyface}
            alt="happy-emoji"
            className="w-[3.8rem] h-[3.8rem] ml-auto"
          />
        </div>
        <div className="option-2 bg-white px-[2rem] py-[1.2rem] flex gap-[1.2rem] items-center  border-[2px] border-blue-100 rounded-[1rem]">
          <div className="w-[2rem] h-[2rem] rounded-full border-[1.5px] border-blue-200"></div>
          <p className="text-left">Happy</p>
          <Image
            src={Happyface}
            alt="happy-emoji"
            className="w-[3.8rem] h-[3.8rem] ml-auto"
          />
        </div>
        <div className="option-3 bg-white px-[2rem] py-[1.2rem] flex gap-[1.2rem] items-center  border-[2px] border-blue-100 rounded-[1rem]">
          <div className="w-[2rem] h-[2rem] rounded-full border-[1.5px] border-blue-200"></div>
          <p className="text-left">Neutral</p>
          <Image
            src={Neutralface}
            alt="happy-emoji"
            className="w-[3.8rem] h-[3.8rem] ml-auto"
          />
        </div>
        <div className="option-4 bg-white px-[2rem] py-[1.2rem] flex gap-[1.2rem] items-center  border-[2px] border-blue-100 rounded-[1rem]">
          <div className="w-[2rem] h-[2rem] rounded-full border-[1.5px] border-blue-200"></div>
          <p className="text-left">Sad</p>
          <Image
            src={Sadface}
            alt="happy-emoji"
            className="w-[3.8rem] h-[3.8rem] ml-auto"
          />
        </div>
        <div className="option-5 bg-white px-[2rem] py-[1.2rem] flex gap-[1.2rem] items-center  border-[2px] border-blue-100 rounded-[1rem]">
          <div className="w-[2rem] h-[2rem] rounded-full border-[1.5px] border-blue-200"></div>
          <p className="text-left">Very Sad</p>
          <Image
            src={VerySadface}
            alt="happy-emoji"
            className="w-[3.8rem] h-[3.8rem] ml-auto"
          />
        </div>
      </section>
    </div>
  );
};
