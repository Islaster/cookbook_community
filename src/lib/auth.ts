"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserById } from "@/lib/db/users";

type Payload = {
  userId: number;
  lat: number;
  exp: number;
};

type User = {
  id: number;
  username: string;
  email: string;
};

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Payload;
    const user: User | null = await getUserById(decoded.userId);
    return user;
  } catch {
    return null;
  }
}
