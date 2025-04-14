import type { User } from "@prisma/client";

export type SafeUser = Pick<
  User,
  "id" | "username" | "bio" | "name" | "image" | "socials"
>;
