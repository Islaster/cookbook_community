"use client";

import { updateUserSettings } from "./actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { SafeUser } from "@/types/user";

type Props = {
  user: SafeUser;
};

export default function SettingsForm({ user }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: user.username,
    bio: user.bio,
    socials: user.socials || {},
  });

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const onSubmit = async () => {
    const data = new FormData();
    data.append("userId", String(user.id));
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (key === "username" && typeof value === "string") {
        if (value.includes(" ")) {
          return alert("Username cannot have spaces");
        }
      }

      if (value !== undefined && value !== null) {
        data.append(key, value.toString());
      }
    }
    await updateUserSettings(data);
    router.push(`/profile/${formData.username}`);
  };

  return (
    <form action={onSubmit}>
      <FormInput
        label="Username"
        value={formData.username}
        onChange={handleChange("username")}
      />
      <FormInput
        label="Bio"
        value={formData.bio ?? ""}
        onChange={handleChange("bio")}
      />
      {/* More socials */}
      <button type="submit">Save Changes</button>
    </form>
  );
}
