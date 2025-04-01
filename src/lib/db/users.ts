import { prisma } from "@/lib/prisma";

export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      // optionally add name, avatar, etc.
    },
  });
}
