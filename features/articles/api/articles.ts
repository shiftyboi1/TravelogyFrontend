import { client } from "@/api/client";
import { Article, ArticleDelimiter, ArticleDelimiterDto } from "../types/types";

export async function fetchArticle(articleDelimiter: ArticleDelimiter): Promise<Article> {
  const articleDelimiterDto: ArticleDelimiterDto = {
    location: articleDelimiter.location,
    language: articleDelimiter.language,
    internalType: articleDelimiter.type,
    internalTag: articleDelimiter.mode,
  };

  return client<Article>(`/article`, {
    method: "POST",
    body: JSON.stringify(articleDelimiterDto),
  });
}