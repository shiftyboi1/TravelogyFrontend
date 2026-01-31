import { ArticleDelimiter } from "@/features/articles/types/types";
import { createContext, useContext, useState, type ReactNode } from "react";

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