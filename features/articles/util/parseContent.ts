import { ArticleData } from "@/features/articles/types/types";

export function parseContent(input: string): {data: ArticleData, markdown: string} {
  const regex = /```json\s*(\{.*?\})\s*```\s*(.*)/s;
  const match = input.match(regex);

  if (!match) {
    return { data: {} as ArticleData, markdown: input.trim() };
  }

  const jsonString = match[1];
  const markdownBody = match[2].trim();

  try {
    const data: ArticleData = JSON.parse(jsonString);
    return {
      data: data,
      markdown: markdownBody,
    };
  } catch (error) {
    // ignore
    return {
      data: {} as ArticleData,
      markdown: markdownBody,
    };
  }
} 