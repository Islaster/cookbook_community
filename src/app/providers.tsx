import { UserProvider } from "@/contexts/userContext";
import { ReactNode } from "react";
import { getUserFromCookie } from "@/lib/auth";

export default async function Providers({ children }: { children: ReactNode }) {
  const user = await getUserFromCookie();

  return <UserProvider initialUser={user}>{children}</UserProvider>;
}
