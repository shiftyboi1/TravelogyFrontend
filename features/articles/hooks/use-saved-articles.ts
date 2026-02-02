import { deleteArticleFromStorage, getSavedArticlesList } from "@/features/articles/services/article-storage";
import { ArticlePreview } from "@/features/articles/types/types";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useSavedArticles() {
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadArticles = useCallback(async () => {
    try {
      const data = await getSavedArticlesList();
      setArticles(data);
    } catch (error) {
      // Ignore :p
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadArticles();
    }, [loadArticles])
  );

  const deleteArticle = async (articleId: number) => {
    try {
      await deleteArticleFromStorage(articleId);
      setArticles((prevArticles) => prevArticles.filter((article) => article.articleId !== articleId));
    } catch (error) {
      // Ignore :p
    }
  }

  return { articles, isLoading, deleteArticle, refresh: loadArticles };
}