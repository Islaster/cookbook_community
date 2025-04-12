"use client";

import { updateUserSettings } from "./actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";

export default function SettingsForm({ user }: any) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: user.username,
    bio: user.bio,
    socials: user.socials || {},
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const onSubmit = async () => {
    const data = new FormData();
    data.append("userId", user?.id);
    for (const key in formData) {
      const value = formData[key];
      if (key === "username") {
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
        value={formData.bio}
        onChange={handleChange("bio")}
      />
      {/* More socials */}
      <button type="submit">Save Changes</button>
    </form>
  );
}
