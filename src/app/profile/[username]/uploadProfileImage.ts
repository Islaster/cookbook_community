"use server";

import { prisma } from "@/lib/prisma";
import { uploadToS3, streamToBuffer } from "@/lib/s3";
import { redirect } from "next/navigation";

export async function uploadProfileImage(formData: FormData) {
  const username = formData.get("username") as string;
  const file = formData.get("image") as File;
  if (!file || !username) return;

  const buffer = await streamToBuffer(file.stream());
  const url = await uploadToS3(buffer, file.name, file.type);

  await prisma.user.update({
    where: { username },
    data: { image: url },
  });
  redirect(`/profile/${username}`);
}
