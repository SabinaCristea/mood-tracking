import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import closeIcon from "/public/assets/images/close.svg";
import { useUser } from "@clerk/nextjs";
import placeholderImage from "../../public/assets/images/avatar-placeholder.svg";

import infoIcon from "/public/assets/images/info-circle.svg";

type ProfileDetailsTypes = {
  title: string;
  description: string;
  setIsProfileDetailsOpen: (open: boolean) => void;
  saveBtnText: string;
};

type ProfileErrors = {
  name?: string;
  image?: string;
};

const ALLOWED_TYPES = ["image/png", "image/jpeg"];

export const ProfileDetails = ({
  title,
  description,
  setIsProfileDetailsOpen,
  saveBtnText,
}: ProfileDetailsTypes) => {
  const { user } = useUser();

  const [updatedName, setUpdatedName] = useState(
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | StaticImageData>(
    user?.imageUrl ?? placeholderImage
  );
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<ProfileErrors>({});

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (updatedName.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        name: "Name cannot be empty",
      }));
      return;
    }
    try {
      setLoading(true);

      const [firstName, ...rest] = updatedName.trim().split(" ");
      const lastName = rest.join(" ");

      await user.update({
        firstName,
        lastName,
      });

      if (imageFile) {
        await user.setProfileImage({ file: imageFile });
      }

      setIsProfileDetailsOpen(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-150 flex items-center justify-center">
        <div className="bg-neutral-0 py-16 px-8 sm:py-[4.8rem] sm:px-16 rounded-2xl shadow-lg w-full md:w-240 mx-8 sm:mx-32 md:mx-auto relative">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 sm:top-10 sm:right-10 text-neutral-500 hover:text-neutral-900 cursor-pointer w-4 h-4 sm:w-6 sm:h-6 outline-focus"
            onClick={() => setIsProfileDetailsOpen(false)}
          >
            <Image
              src={closeIcon}
              alt="close btn"
              className="hover:cursor-pointer hover:opacity-50"
            />
          </button>

          <h1 className="font-bold text-[2.8rem] leading-[130%] mb-[0.8rem]">
            {title}
          </h1>
          <p className="text-neutral-600 text-preset-6-regular  pb-[2.4rem] sm:pb-[3.2rem] ">
            {description}
          </p>

          <form onSubmit={handleUpdateProfile}>
            <div className="input-name flex flex-col gap-[0.8rem] mb-[2.4rem]">
              <label className="text-neutral-900 text-preset-6-regular ">
                Name
              </label>
              <input
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                type="text"
                name="name"
                className="h-[4.9rem] border rounded-2xl placeholder:text-neutral-600 text-preset-6-regular px-[1.6rem] border-neutral-600 outline-focus"
                placeholder={user?.fullName ? "" : "Jane Appleseed"}
                //required
              />
              {errors.name && (
                <div className="flex items-center gap-[0.8rem] mt-[0.8rem]">
                  <Image src={infoIcon} alt="Info icon" />
                  <p className="text-red-500 text-[1.2rem] leading-[110%]">
                    {errors.name}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-8 mb-[2.4rem] sm:mb-[3.2rem]">
              <div className="photo w-[6.4rem] h-[6.4rem] rounded-full overflow-hidden">
                <Image
                  src={imagePreview}
                  width={64}
                  height={64}
                  className="object-cover object-center"
                  alt={user?.fullName ?? "User avatar"}
                />
              </div>
              <div className="details-and-btn flex flex-col items-start">
                <p className="mb-[0.6rem] text-preset-6-regular">
                  Upload Image
                </p>
                <p className="mb-[1.6rem] text-neutral-600 text-preset-7">
                  Max 250K, PNG or JPEG
                </p>

                <div className="relative ">
                  <input
                    type="file"
                    //  accept="image/png, image/jpeg"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
                    className="leading-[130%] tracking-[0px] px-[1.6rem] py-[0.8rem] border border-neutral-300 text-preset-6 rounded-[0.8rem] outline-focus hover:cursor-pointer flex justify-center items-center"
                  >
                    Upload
                  </label>
                </div>
                {errors.image && (
                  <div className="flex items-center gap-[0.8rem] mt-[0.8rem]">
                    <Image src={infoIcon} alt="Info icon" />
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
                className="bg-blue-600 rounded-2xl text-neutral-0 text-preset-5 w-full h-24 hover:bg-blue-700 hover:cursor-pointer outline-focus"
              >
                {loading ? "Saving..." : saveBtnText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
