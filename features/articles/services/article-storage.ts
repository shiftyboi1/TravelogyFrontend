import { db } from "@/services/database";
import { Article, ArticlePreview } from "../types/types";

export const getSavedArticlesList = async () : Promise<Array<ArticlePreview>> => {
  console.log('Fetching saved articles from storage...');
  const articles = await db.getAllAsync<ArticlePreview>(
    'SELECT location, tag, articleId FROM articles',
  );
  console.log ('Fetched articles:', articles);
  return articles;
};

export const deleteArticleFromStorage = async (articleId: number) => {
  console.log(`Deleting article ${articleId} from storage...`);
  await db.runAsync(
    'DELETE FROM articles WHERE articleId = ?', [articleId]);
};

export const saveArticleToDevice = async (article: Article) => {
  console.log(`Saving article ${article.articleId} to storage...`);
  const foundArticle = await db.getFirstAsync(
    'SELECT articleId FROM articles WHERE articleId = ?', [article.articleId]);

  if (foundArticle) {
    console.log(`Article ${article.articleId} already exists in storage. Skipping.`);
    return; // Article already exists
  }
  
  console.log(`Inserting article ${article.articleId} into database...`);

  await db.runAsync(
    'INSERT INTO articles (articleId, location, tag, type, language, version, text) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [article.articleId, article.location, article.tag, article.type, article.language, article.version, article.text]
  );
};