import { useEffect, useState } from "react";
import { fetchArticle } from "../api/articles";
import { Article, ArticleDelimiter } from "../types/types";


export function useArticle(articleDelimiter?: ArticleDelimiter, articleId?: number) {
  const [article, setArticle] = useState<Article | null>(null);
  const [articleStatus, setArticleStatus] = useState<'loading' | 'error' | 'loaded'>('loading');

  useEffect(() => {
    let isMounted = true;

    async function fetchAndSetArticle() {
      if (!articleDelimiter) return;
      try {
        if (isMounted) setArticleStatus('loading');
        const fetchedArticle = await fetchArticle(articleDelimiter);
        if (isMounted) {
          setArticle(fetchedArticle);
          setArticleStatus('loaded');
        }
      } catch (error) {
        if (isMounted) {
          setArticle(null);
          setArticleStatus('error');
        }
      }
    }
    
    if (articleDelimiter) {
      fetchAndSetArticle();
    }
    // TODO: If an ID is provided, fetch from files.
    // TODO: Check if article with delimiter exists in files before fetching from API.
    
    return () => { isMounted = false; };
  }, [articleDelimiter, articleId]);

  return {article, articleStatus};
}