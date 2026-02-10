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

export async function fetchArticleUpdate(id: number, currentVersion: number): Promise<Article | null> {
  try {
    return await client<Article>(`/article/version/${id}/${currentVersion}`);
  } catch (error) {
    console.log("Failed to fetch article update:", error);
    return null;
  }
}