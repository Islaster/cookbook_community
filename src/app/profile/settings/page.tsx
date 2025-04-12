"use client";

import SettingsForm from "./SettingsForm";
import { useUserContext } from "@/contexts/userContext";

export default async function SettingsPage() {
  const { user } = await useUserContext(); // however you grab logged in user

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Settings</h1>
      <SettingsForm user={user} />
    </div>
  );
}
