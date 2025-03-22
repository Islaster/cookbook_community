"use client";

import { useSearchContext } from "@/contexts/searchContext";

export default function Search() {
  const { query } = useSearchContext();

  return <h1>Search Page</h1>;
}
