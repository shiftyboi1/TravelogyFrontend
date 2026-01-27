import { createContext, useContext, useState, type ReactNode } from "react";

export type ArticleDelimiter = {
  location: string;
  type: "city" | "country";
  mode: string;
  language: string;
}

type SearchContextType = {
  articleDelimiter: ArticleDelimiter;
  setArticleDelimiter: (delimiter: ArticleDelimiter) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [articleDelimiter, setArticleDelimiter] = useState<ArticleDelimiter>({
    location: "",
    type: "city",
    mode: "",
    language: "en",
  });

  return (
    <SearchContext.Provider value={{ articleDelimiter, setArticleDelimiter }}>
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