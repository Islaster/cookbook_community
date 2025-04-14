"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-4 left-4 text-sm text-gray-700 hover:text-blue-600 bg-gray-200 px-3 py-1 rounded-md shadow-sm cursor-pointer"
    >
      ← Back
    </button>
  );
}
