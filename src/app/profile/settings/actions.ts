"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateUserSettings(formData: FormData) {
  const userId = formData.get("userId") as string;
  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;

  const exists = await prisma.user.findUnique({ where: { username } });

  if (exists && exists.id !== parseInt(userId)) {
    throw new Error("Username already taken.");
  }

  await prisma.user.update({
    where: { id: parseInt(userId) },
    data: { username, bio },
  });

  redirect(`/profile/${username}`);
}
