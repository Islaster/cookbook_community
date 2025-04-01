"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import { useLogout } from "@/lib/logoutClient";

export default function Navbar() {
  const pathname = usePathname();
  const [search, setSearch] = useState(false);

  const { user } = useUserContext();
  const logout = useLogout();
  function isActive(path: string) {
    return pathname === path ? "text-blue-600 font-bold" : "text-gray-700";
  }

  function renderSearch() {
    return (
      <div className="w-48 flex justify-end">
        {search ? (
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <img
            src="/search-icon.png"
            alt="search icon"
            className="h-6 w-6 cursor-pointer"
            onClick={() => setSearch(true)}
          />
        )}
      </div>
    );
  }

  function renderAuth() {
    return (
      <>
        {user?.username ? (
          <>
            <Link href="/profile">Profile</Link>
            <button
              onClick={logout}
              className={`${isActive("/auth")} hover:text-blue-600 font-medium`}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth"
            className={`${isActive("/auth")} hover:text-blue-600 font-medium`}
          >
            Login/Signup
          </Link>
        )}
      </>
    );
  }
  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/*logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/community_cookbook_logo.png"
              alt="logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>
        {/* Navigation Links */}
        <nav className="flex space-x-6 ml-32">
          <Link
            href="/"
            className={`${isActive("/")} hover:text-blue-600 font-medium`}
          >
            Home
          </Link>
          <Link
            href="/recipes"
            className={`${isActive(
              "/recipes"
            )} hover:text-blue-600 font-medium`}
          >
            Recipes
          </Link>
          <Link
            href="/explore"
            className={`${isActive(
              "/explore"
            )} hover:text-blue-600 font-medium`}
          >
            Explore
          </Link>
          <Link
            href="/groups"
            className={`${isActive("/groups")} hover:text-blue-600 font-medium`}
          >
            Groups
          </Link>
          {renderAuth()}
        </nav>
        <div className="hidden md:block">{renderSearch()}</div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none">
            {/* Add an icon here for mobile menu (e.g., Hamburger menu icon) */}
            ☰
          </button>
        </div>
      </div>
    </div>
  );
}
