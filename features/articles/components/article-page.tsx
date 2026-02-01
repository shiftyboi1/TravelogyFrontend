import { ThemedView } from "@/components/themed-view";
import { useSessionContext } from "@/context/session-context";
import { useSearchContext } from "@/features/search/context/search-context";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { postArticleRating } from "../api/ratings";
import { useArticle } from "../hooks/use-article";
import { useRatings } from "../hooks/use-ratings";
import { parseContent } from "../util/parseContent";
import { ArticleHeader } from "./article-header";
import { DownloadButton } from "./downloadButton";
import { MarkdownRenderer } from "./markdown-renderer";
import { Ratings } from "./ratings";
import { Ticket } from "./ticket";

export function ArticlePage() {

  const { articleDelimiter } = useSearchContext();
  const { userId } = useSessionContext();
  const { article, articleStatus } = useArticle(articleDelimiter);
  const { ratings, setRatings, userRating } = useRatings(article?.articleId);

  const { data, markdown } = parseContent(article?.text || "");

  const [formattedUserRating, setFormattedUserRating] = useState<"positive" | "negative" | undefined>(undefined);

  const ERROR_TEXT = "Connection to server unavailable.";

  const handleRatingChange = async (currentRating: 'positive' | 'negative' | undefined, newRating: 'positive' | 'negative') => {
    if (currentRating === newRating) return;
    if (!userId || !article?.articleId) return;
    if (newRating === 'positive') {
      setRatings({
        positiveRatings: ratings.positiveRatings + 1,
        negativeRatings: currentRating === 'negative' ? ratings.negativeRatings - 1 : ratings.negativeRatings,
      });
      setFormattedUserRating('positive');
    } else {
      setRatings({
        positiveRatings: currentRating === 'positive' ? ratings.positiveRatings - 1 : ratings.positiveRatings,
        negativeRatings: ratings.negativeRatings + 1,
      });
      setFormattedUserRating('negative');
    }
    postArticleRating(article!.articleId!, userId, newRating === 'positive' ? true : false);
  };

  useEffect(() => {
    if (userRating === null || userRating === undefined) {
      setFormattedUserRating(undefined);
      return;
    }
    setFormattedUserRating(userRating ? 'positive' : 'negative');
  }, [userRating]);

  return (
    <ThemedView style={styles.container}>
      <ArticleHeader locationText={articleDelimiter.location} style={styles.header} />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.content}>
          <Ticket delimiter={articleDelimiter} content={data} style={styles.ticket} />
          <MarkdownRenderer
            style={styles.markdown}
            markdown={ articleStatus === 'loaded' || articleStatus === 'loading' ? markdown : ERROR_TEXT} />
        </ThemedView>
      </ScrollView>
      <View style={styles.lowBar}>
        <Ratings
        positive={ratings.positiveRatings}
        negative={ratings.negativeRatings}
        available={article?.articleId !== undefined}
        style={styles.ratings}
        onChange={handleRatingChange}
        userRating={formattedUserRating} />
        <DownloadButton available={article !== undefined} onPress={() => {}} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    zIndex: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    alignItems: 'stretch',
    marginTop: 200,
    minHeight: 100,
    borderRadius: 16,
  },
  ticket: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  markdown: {
    marginBottom: 240,
    paddingHorizontal: 24,
  },
  lowBar: {
    gap: 16,
    flexDirection: 'row',
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 16,
    marginBottom: 64,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  ratings: {
    height: '100%',
    flex: 1,
  },
});