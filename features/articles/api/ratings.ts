import { client } from "@/api/client";
import { RatingPostDto, RatingPostResponseDto, RatingsOfResponseDto } from "@/features/articles/types/types";

export async function postArticleRating( articleId: number, userId: number, positive: boolean): Promise<RatingPostResponseDto> {
  const ratingPostDto : RatingPostDto = {
    userId,
    articleId,
    positive
  };

  return client<RatingPostResponseDto>(`/ratings`, {
    method: "POST",
    body: JSON.stringify(ratingPostDto),
  });
}

export async function fetchArticleRatings(articleId: number): Promise<RatingsOfResponseDto> {
  return client<RatingsOfResponseDto>(`/ratings/of/${articleId}`, {
    method: "GET",
  });
}

export async function fetchUserArticleRating(userId: number, articleId: number): Promise<{ positive : boolean } | null>{
  return client<{ positive: boolean } | null>(`/ratings/of/user/${articleId}/${userId}`, {
    method: "GET",
  });
}