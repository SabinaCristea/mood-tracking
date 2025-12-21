import Image from "next/image";
import React from "react";

type ProfileDetailsTypes = {
  title: string;
  description: string;
  setIsProfileDetailsOpen: (open: boolean) => void;
};

export const ProfileDetails = ({
  title,
  description,
  setIsProfileDetailsOpen,
}: ProfileDetailsTypes) => {
  return (
    <>
      {/* <div className="fixed inset-0"></div> */}
      <div className="fixed inset-0 z-150 flex items-center justify-center">
        <div className="bg-neutral-0 py-16 px-6 rounded-2xl shadow-lg w-full max-w-lg mx-4 relative">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900"
            onClick={() => setIsProfileDetailsOpen(false)}
          >
            ✕
          </button>

          <h1 className="font-bold text-[2.8rem] leading-[130%] mb-[0.8rem]">
            {title}
          </h1>
          <p className="text-neutral-600 pb-[3.2rem]">{description}</p>

          <form>
            <div className="input-name flex flex-col gap-[0.8rem] mb-[2.4rem]">
              <label className="text-neutral-900">Name</label>
              <input
                type="text"
                name="name"
                className="h-[4.9rem] border-[1px] border-neutral-300 rounded-[1rem] placeholder:text-neutral-600 px-[1.6rem] hover:border-neutral-600 outline-focus"
                placeholder="Jane Appleseed"
                required
              />
            </div>

            <div className="flex gap-[2rem] mb-[3.2rem]">
              <div className="photo">{/* optional image preview */}</div>
              <div className="details-and-btn flex flex-col items-start">
                <p className="mb-[0.6rem]">Upload Image</p>
                <p className="mb-[1.6rem] text-[1.5rem] text-neutral-600">
                  Max 250K, PNG or JPEG
                </p>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="file-upload"
                    className="leading-[130%] tracking-[0px] px-[1.6rem] py-[0.8rem] border-[1px] border-neutral-300 rounded-[0.8rem] outline-focus hover:cursor-pointer flex justify-center items-center"
                  >
                    Upload
                  </label>
                </div>
              </div>
            </div>

            <div className="action-btn">
              <button
                type="submit"
                className="bg-blue-600 rounded-[1rem] text-neutral-0 w-[100%] h-[5.2rem] hover:bg-blue-700 hover:cursor-pointer outline-focus"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
