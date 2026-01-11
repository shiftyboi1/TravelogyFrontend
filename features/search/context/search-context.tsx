import { createContext, useContext, useState, type ReactNode } from "react";

type SearchContextType = {
  searchedTerm: string;
  setSearchedTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [searchedTerm, setSearchedTerm] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchedTerm, setSearchedTerm }}>
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