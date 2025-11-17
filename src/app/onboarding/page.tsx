"use client";

import Link from "next/link";
import React, { useState } from "react";
import logo from "../../../public/assets/images/logo.svg";
import Image from "next/image";
import placeholderImage from "../../../public/assets/images/avatar-placeholder.svg";
import { saveUserProfile } from "../../../convex/functions/users";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(placeholderImage);

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) return;

    try {
      setLoading(true);

      // Update name
      await user.update({ firstName: name });

      // Upload profile picture (if one was chosen)
      if (imageFile) {
        await user.setProfileImage({ file: imageFile });
      }

      console.log("✅ Profile updated!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-[3.2rem] mt-[8rem]">
      <Image src={logo} alt="Logo" />

      <div className="card text-[1.8rem] leading-[140%] tracking-[-0.3px]  text-neutral-900 bg-neutral-0 py-[4rem] px-[1.6rem] mx-[1.6rem] rounded-[1.6rem] ">
        <h1 className="font-bold text-[2.8rem] leading-[130%] mb-[0.8rem]">
          Personalize your experience
        </h1>
        <p className="text-neutral-600 pb-[3.2rem]">
          Add your name and a profile picture to make Mood yours.
        </p>

        <form onSubmit={submit}>
          <div className="input-name flex flex-col gap-[0.8rem] mb-[2.4rem]">
            <label className="text-neutral-900">Name</label>
            <input
              type="text"
              name="name"
              className="h-[4.9rem] border-[1px] border-neutral-300 rounded-[1rem] placeholder:text-neutral-600 px-[1.6rem] hover:border-neutral-600 outline-focus"
              placeholder="Jane Appleseed"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-[2rem] mb-[3.2rem]">
            <div className="photo">
              <Image src={imagePreview} alt="photo" width={80} height={80} />
            </div>
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
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
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
              disabled={loading}
              className=" bg-blue-600 rounded-[1rem] text-neutral-0 w-[100%] h-[5.2rem] hover:bg-blue-700 hover:cursor-pointer outline-focus"
            >
              {loading ? "Loading..." : "Start Tracking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
