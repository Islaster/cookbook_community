"use client";

import ProfileImageForm from "./ProfileImageForm";
import { useUserContext } from "@/contexts/userContext";
import Image from "next/image";

export default function ProfileImageDisplay({
  image,
  username,
}: {
  image: string;
  username: string;
}) {
  const { tempImage } = useUserContext();
  console.log("tempImage url :", tempImage);
  return (
    <div className="relative w-20 h-20 group overflow-hidden rounded-full">
      <Image
        src={tempImage || image}
        alt="profile"
        fill
        className="object-cover"
      />

      <label
        htmlFor="profileUpload"
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
      >
        <span className="text-white text-3xl font-bold">+</span>
      </label>

      <ProfileImageForm username={username} />
    </div>
  );
}
