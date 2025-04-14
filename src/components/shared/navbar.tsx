"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import { useLogout } from "@/lib/logoutClient";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState(false);
  const [title, setTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useUserContext();
  const logout = useLogout();

  function isActive(path: string) {
    return pathname === path ? "text-blue-600 font-bold" : "text-gray-700";
  }

  function onEnterKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearch(false);
      router.push(`/search/${title}`);
    }
  }

  function renderSearch() {
    return (
      <div className="w-48 flex justify-end">
        {search ? (
          <form className="w-full">
            <input
              type="text"
              placeholder="Search..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={onEnterKeyPress}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </form>
        ) : (
          <div
            className="h-6 w-6 cursor-pointer relative"
            onClick={() => setSearch(true)}
          >
            <Image
              src="/images/search-icon.png"
              alt="search icon"
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>
    );
  }

  function renderAuth() {
    return user?.username ? (
      <>
        <Link
          href="/recipe/create"
          className={`${isActive(
            "/recipe/create"
          )} hover:text-blue-600 font-medium`}
        >
          Create Recipe
        </Link>
        <Link
          href={`/profile/${user.username}`}
          className={`${isActive(
            `/profile/${user.username}`
          )} hover:text-blue-600 font-medium`}
        >
          Profile
        </Link>
        <button onClick={logout} className="hover:text-blue-600 font-medium">
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
    );
  }

  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 p-4">
        {/* Logo */}
        <Link href="/">
          <div className="relative h-12 w-[120px]">
            <Image
              src="/images/community_cookbook_logo.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6">
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
          {renderAuth()}
        </nav>

        {/* Search Desktop */}
        <div className="hidden md:block">{renderSearch()}</div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 text-3xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-4 pb-4">
          <Link
            href="/"
            className={`${isActive("/")} hover:text-blue-600 font-medium`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/recipes"
            className={`${isActive(
              "/recipes"
            )} hover:text-blue-600 font-medium`}
            onClick={() => setMenuOpen(false)}
          >
            Recipes
          </Link>
          {renderAuth()}
          <div>{renderSearch()}</div>
        </div>
      )}
    </div>
  );
}
