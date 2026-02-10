import { useLanguage } from "@/context/language-context";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { fetchArticle, fetchArticleUpdate } from "../api/articles";
import { getSavedArticleByDelimiter, getSavedArticleById, updateSavedArticle } from "../services/article-storage";
import { Article, ArticleDelimiter } from "../types/types";


export function useArticle(articleDelimiter?: ArticleDelimiter, articleId?: number | null) {
  const [article, setArticle] = useState<Article | null>(null);
  const [articleStatus, setArticleStatus] = useState<'loading' | 'error' | 'loaded'>('loading');
  const [articleLocal, setArticleLocal] = useState<boolean>(false);
  const { t } = useLanguage();

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

        try {
          const updatedArticle = await fetchArticleUpdate(localArticle.articleId!, localArticle.version);
          if (updatedArticle && isMounted && updatedArticle.version > localArticle.version) {
            Alert.alert(t("text.article_update_title"), t("text.article_update_message"));
            console.log("Article updated from version", localArticle.version, "to", updatedArticle.version);
            setArticle(updatedArticle);
            await updateSavedArticle(updatedArticle);
          }
        } catch (error) {
          // Ignore :p
        }
        return;
      }
      
      if (!articleDelimiter || articleDelimiter.location === "" || articleDelimiter.mode === "")  return;

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
    
    return () => { isMounted = false; };
  }, [articleDelimiter, articleId]);

  return {article, articleStatus, articleLocal};
}