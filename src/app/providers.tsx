export const dynamic = "force-dynamic";

import { UserProvider } from "@/contexts/userContext";
import { ReactNode } from "react";
import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Providers({ children }: { children: ReactNode }) {
  const cookie = await getUserFromCookie();

  let user = null;

  if (cookie) {
    user = await prisma.user.findUnique({
      where: { id: cookie.id },
    });
  }

  return <UserProvider initialUser={user}>{children}</UserProvider>;
}
