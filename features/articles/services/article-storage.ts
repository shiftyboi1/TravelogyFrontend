import { db } from "@/services/database";
import { ArticlePreview } from "../types/types";

export const getSavedArticlesList = async () : Promise<Array<ArticlePreview>> => {
  const articles = await db.getAllAsync<ArticlePreview>(
    'SELECT location, tag, articleId FROM articles_preview',
  );
  return articles;
};

export const deleteArticleFromStorage = async (articleId: number) => {
  await db.runAsync(
    'DELETE FROM articles_preview WHERE articleId = ?', [articleId]);
};