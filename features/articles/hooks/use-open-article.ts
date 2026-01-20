import { router } from "expo-router";
import type { ArticleDelimiter } from "../types/types";

export function useOpenArticle() {
  const openArticle = ( params:{
    delimiter?: ArticleDelimiter
    articleId?: number,
  }) => {
    router.push({
    pathname: "/article",
    params: {
      ...(params.delimiter && { delimiter: JSON.stringify(params.delimiter) }),
      ...(params.articleId && { articleId: params.articleId }),
    }
  });
}

  return { openArticle };
  
}