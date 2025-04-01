"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  name?: string;
  socials?: any;
};

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
}>({
  user: null,
  setUser: () => {},
  fetchUser: async () => {},
});

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Fetch user failed:", err);
      setUser(null);
    }
  };

  console.log(user);
  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
