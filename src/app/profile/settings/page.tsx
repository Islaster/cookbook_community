"use client";

import BackButton from "@/components/shared/backButton";
import SettingsForm from "./SettingsForm";
import { useUserContext } from "@/contexts/userContext";

export default function SettingsPage() {
  const { user } = useUserContext();

  return (
    <div className="relative max-w-xl mx-auto pt-12">
      <BackButton />

      <h1 className="text-2xl mb-4">Settings</h1>

      {user && <SettingsForm user={user} />}
    </div>
  );
}
