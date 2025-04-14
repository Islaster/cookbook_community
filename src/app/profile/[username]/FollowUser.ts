"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type FollowProps = {
  userId: number;
  targetId: string;
};

export async function followUser({ userId, targetId }: FollowProps) {
  try {
    if (!targetId) {
      throw new Error("Missing targetId in followUser()");
    }

    const target = await prisma.user.findUnique({
      where: { username: targetId },
    });

    if (!target) {
      throw new Error("Target user not found");
    }

    await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: target.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === "P2002") {
        console.log("Already following");
      } else {
        console.error("Follow Error:", error);
        throw error;
      }
  }
}

export async function checkFollowing({ userId, targetId }: FollowProps) {
  const target = await prisma.user.findUnique({
    where: { username: targetId },
  });

  if (!target) return false;

  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: target.id,
      },
    },
  });

  return !!existingFollow;
}

export async function unfollowUser({ userId, targetId }: FollowProps) {
  const target = await prisma.user.findUnique({
    where: { username: targetId },
  });

  if (!target) throw new Error("User not found");

  await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: target.id,
      },
    },
  });
}
