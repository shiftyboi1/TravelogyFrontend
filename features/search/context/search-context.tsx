import { createContext, useContext, useState, type ReactNode } from "react";

export type ArticleDelimiter = {
  location: string;
  type: "city" | "country";
  mode: string;
  language: string;
}

type SearchContextType = {
  searchedTerm: string;
  setSearchedTerm: (term: string) => void;
  searchedMode: "city" | "country";
  setSearchedMode: (mode: "city" | "country") => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [searchedMode, setSearchedMode] = useState<"city" | "country">("city");
  const [searchedTerm, setSearchedTerm] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchedTerm, setSearchedTerm, searchedMode, setSearchedMode }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}