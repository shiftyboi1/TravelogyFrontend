import { useEffect, useState } from "react";
import { fetchArticle } from "../api/articles";
import { Article, ArticleDelimiter } from "../types/types";


export function useArticle(articleDelimiter?: ArticleDelimiter, articleId?: number) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAndSetArticle() {
      if (!articleDelimiter) return;
      try {
        const fetchedArticle = await fetchArticle(articleDelimiter);
        if (isMounted) setArticle(fetchedArticle);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    }
    
    if (articleDelimiter) {
      fetchAndSetArticle();
    }
    // TODO: If an ID is provided, fetch from files.
    // TODO: Check if article with delimiter exists in files before fetching from API.
    
    return () => { isMounted = false; };
  }, [articleDelimiter, articleId]);

  return {article};
}