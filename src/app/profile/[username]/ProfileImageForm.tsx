"use client";

import { uploadProfileImage } from "./uploadProfileImage";
import { useUserContext } from "@/contexts/userContext";

export default function ProfileImageForm({ username }: { username: string }) {
  const { setTempImage } = useUserContext();
  return (
    <form action={uploadProfileImage}>
      <input type="hidden" name="username" value={username} />
      <input
        type="file"
        name="image"
        accept="image/*"
        className="hidden"
        id="profileUpload"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setTempImage(URL.createObjectURL(file));
          e.currentTarget.form?.requestSubmit();
        }}
      />
    </form>
  );
}
