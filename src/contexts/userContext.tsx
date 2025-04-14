"use client";

import { createContext, useContext, useState } from "react";
import { SafeUser } from "@/types/user";

const UserContext = createContext<{
  user: SafeUser | null;
  isEditing: boolean;
  tempImage: string | null;
  setTempImage: (tempImage: string | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  setUser: (user: SafeUser | null) => void;
  fetchUser: () => Promise<void>;
}>({
  user: null,
  isEditing: false,
  tempImage: null,
  setTempImage: () => {},
  setIsEditing: () => {},
  setUser: () => {},
  fetchUser: async () => {},
});

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: null | SafeUser;
}) {
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [user, setUser] = useState<null | SafeUser>(initialUser);
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        isEditing,
        setIsEditing,
        setTempImage,
        tempImage,
      }}
    >
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
