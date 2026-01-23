"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import placeholderImage from "../../../public/assets/images/avatar-placeholder.svg";
// import { saveUserProfile } from "../../../convex/functions/users";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Logo } from "@/_components/icons/Logo";
import { InfoIcon } from "@/_components/icons/InfoIcon";

type ProfileErrors = {
  name?: string;
  image?: string;
};

const ALLOWED_TYPES = ["image/png", "image/jpeg"];

export default function Page() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(placeholderImage);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<ProfileErrors>({});
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const completed = user.unsafeMetadata?.onboardingCompleted;

    console.log(completed);

    if (completed) {
      router.replace("/home");
    }
  }, [isLoaded, user, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) return;

    if (name.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        name: "Name cannot be empty",
      }));
      return;
    }

    try {
      setLoading(true);

      // Update name
      await user.update({ firstName: name });

      // Upload profile picture (if one was chosen)
      if (imageFile) {
        await user.setProfileImage({ file: imageFile });
      }

      await user.update({
        unsafeMetadata: {
          onboardingCompleted: true,
        },
      });

      router.push("/home");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // clean for improvement
  useEffect(() => {
    return () => {
      if (typeof imagePreview === "string") {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="flex flex-col items-center gap-[3.2rem] mt-32">
      <Logo />

      <div className="card text-[1.8rem] leading-[140%] tracking-[-0.3px] text-neutral-900 bg-neutral-0 py-16 px-[1.6rem] mx-[1.6rem] sm:px-[3.2rem] rounded-[1.6rem] ">
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
              className="h-[4.9rem] border border-neutral-300 rounded-2xl placeholder:text-neutral-600 px-[1.6rem] hover:border-neutral-600 outline-focus"
              placeholder="Jane Appleseed"
              value={name}
              onChange={(e) => setName(e.target.value)}
              //required
            />
            {errors.name && (
              <div className="flex items-center gap-[0.8rem] mt-[0.8rem]">
                <InfoIcon />
                <p className="text-red-500 text-[1.2rem] leading-[110%]">
                  {errors.name}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-8 mb-[3.2rem]">
            <div className="photo w-[6.4rem] h-[6.4rem] rounded-full overflow-hidden">
              <Image
                src={imagePreview}
                width={64}
                height={64}
                className="object-cover object-center w-full h-full"
                alt="User avatar"
              />
            </div>
            <div className="details-and-btn flex flex-col items-start">
              <p className="mb-[0.6rem]">Upload Image</p>
              <p className="mb-[1.6rem] text-[1.5rem] text-neutral-600">
                Max 250K, PNG or JPEG
              </p>

              <div className="relative focus-within:outline-2 focus-within:outline-blue-600 focus-within:outline-offset-4 rounded-[0.8rem] hover:cursor-pointer">
                <input
                  type="file"
                  //accept="image/png, image/jpeg"
                  id="file-upload"
                  className="absolute inset-0 w-full h-full opacity-0 hover:cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (!ALLOWED_TYPES.includes(file.type)) {
                      setErrors((prev) => ({
                        ...prev,
                        image:
                          "Unsupported file type. Please uplaod a PNG or JPEG",
                      }));
                      return;
                    }

                    if (file.size > 250 * 1024) {
                      setErrors((prev) => ({
                        ...prev,
                        image: "Image must be under 250KB",
                      }));
                      return;
                    }

                    setErrors((prev) => ({
                      ...prev,
                      image: undefined,
                    }));

                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
                />
                <label
                  htmlFor="file-upload"
                  className="leading-[130%] tracking-[0px] px-[1.6rem] py-[0.8rem] border border-neutral-300 rounded-[0.8rem] outline-focus hover:cursor-pointer flex justify-center items-center "
                >
                  Upload
                </label>
              </div>

              {errors.image && (
                <div className="flex items-center gap-[0.8rem] mt-[0.8rem]">
                  <InfoIcon />
                  <p className="text-red-500 text-[1.2rem] leading-[110%]">
                    {errors.image}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="action-btn">
            <button
              type="submit"
              disabled={loading}
              className=" bg-blue-600 rounded-2xl text-neutral-0 w-full h-[5.2rem] hover:bg-blue-700 hover:cursor-pointer outline-focus"
            >
              {loading ? "Loading..." : "Start Tracking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
