"use client";

import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
  query: "",
  setQuery: (e: any) => {},
});

export const SearchProvider = ({ children }: any) => {
  const [query, setQuery] = useState("");

  const value = {
    query,
    setQuery,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearchContext must be used within an SearchProvider");
  }
  return context;
};
