import { useEffect, useState } from "react";
import { fetchArticle } from "../api/articles";
import { getSavedArticleByDelimiter, getSavedArticleById } from "../services/article-storage";
import { Article, ArticleDelimiter } from "../types/types";


export function useArticle(articleDelimiter?: ArticleDelimiter, articleId?: number | null) {
  const [article, setArticle] = useState<Article | null>(null);
  const [articleStatus, setArticleStatus] = useState<'loading' | 'error' | 'loaded'>('loading');
  const [articleLocal, setArticleLocal] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchAndSetArticle() {
      if (!isMounted) return;
      // Try fetch from local DB first
      let localArticle: Article | null = null;
      if (articleId) {
        localArticle = await getSavedArticleById(articleId);
      } else {
        if (!articleDelimiter) return;
        localArticle = await getSavedArticleByDelimiter(articleDelimiter);
      }
      if (localArticle && isMounted) {
        setArticle(localArticle);
        setArticleLocal(true);
        setArticleStatus('loaded');
        return;
      }
      
      if (!articleDelimiter || articleDelimiter.location === "" || articleDelimiter.mode === "")  return;

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

  return {article, articleStatus, articleLocal};
}