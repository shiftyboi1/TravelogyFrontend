import { useSessionContext } from "@/context/session-context";
import { fetchArticleRatings, fetchUserArticleRating } from "@/features/articles/api/ratings";
import { useEffect, useState } from "react";

export function useRatings(articleId: number | undefined) {
  const [ratings, setRatings] = useState<{ positiveRatings: number; negativeRatings: number }>({ positiveRatings: 0, negativeRatings: 0 });
  const [userRating, setUserRating] = useState<boolean | null>(null);
  const { userId } = useSessionContext();


  useEffect(() => {
    let isMounted = true;
    const getRatings = async () => {
      try {
        if (!articleId) {
          if (isMounted) setRatings({ positiveRatings: 0, negativeRatings: 0 });
          return;
        }
        const data = await fetchArticleRatings(articleId);
        if (data && isMounted) {
          setRatings({ positiveRatings: data.positiveRatings, negativeRatings: data.negativeRatings });
        }
      } catch (error) {
        if (isMounted) setRatings({ positiveRatings: 0, negativeRatings: 0 });
      }
    };
    getRatings();
    return () => {
      isMounted = false;
    };
  }, [articleId]);

  useEffect(() => {
    let isMounted = true;
    const getUserRating = async () => {
      try {
        if (!userId || !articleId) {
          if (isMounted) setUserRating(null);
          return;
        }
        const data = await fetchUserArticleRating(userId, articleId);
        if (data && isMounted) {
          setUserRating(data.positive);
        }
      } catch (error) {
        if (isMounted) setUserRating(null);
      }
    };
    getUserRating();
    return () => {
      isMounted = false;
    };
  }, [articleId, userId]);

  return { ratings, setRatings, userRating };
}