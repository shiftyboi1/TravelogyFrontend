import { db } from "@/services/database";
import { Article, ArticlePreview } from "../types/types";

export const getSavedArticlesList = async () : Promise<Array<ArticlePreview>> => {
  const articles = await db.getAllAsync<ArticlePreview>(
    'SELECT location, tag, articleId FROM articles',
  );
  return articles;
};

export const deleteArticleFromStorage = async (articleId: number) => {
  await db.runAsync(
    'DELETE FROM articles WHERE articleId = ?', [articleId]);
};

export const saveArticleToDevice = async (article: Article) => {
  const foundArticle = await db.getFirstAsync(
    'SELECT articleId FROM articles WHERE articleId = ?', [article.articleId]);

  if (foundArticle) {
    return; // Article already exists
  }

  await db.runAsync(
    'INSERT INTO articles (articleId, location, tag, type, language, version, text) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [article.articleId, article.location, article.tag, article.type, article.language, article.version, article.text]
  );
};