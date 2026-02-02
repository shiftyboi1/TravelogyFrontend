export type ArticleDelimiter = {
  location: string;
  type: "city" | "country";
  mode: string;
  language: string;
}

export type ArticleDelimiterDto = {
  location: string;
  language: string;
  internalType: "city" | "country";
  internalTag: string;
};

export type Article = {
  tag: string;
  articleId: number;
  version: number;
  language: string;
  type: "city" | "country";
  location: string;
  text: string;
};

export type ArticlePreview = {
  location: string;
  tag: string;
  articleId: number;
}

export type ArticleData = {
  exists: boolean;
  operatingHours?: string;
  relativePrice?: 'LOW' | 'MID' | 'HIGH';
};

export type RatingPostDto = {
  userId: number;
  articleId: number;
  positive: boolean;
};

export type RatingPostResponseDto = {
  ratingId: number;
  article: Article;
  user: { userId: number };
  isPositive: boolean;
};

export type RatingsOfResponseDto = {
  positiveRatings: number;
  negativeRatings: number;
};