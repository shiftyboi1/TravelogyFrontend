import { ThemedView } from "@/components/themed-view";
import { useSearchContext } from "@/features/search/context/search-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { useArticle } from "../hooks/useArticle";
import { parseContent } from "../util/parseContent";
import { ArticleHeader } from "./article-header";
import { DownloadButton } from "./downloadButton";
import { MarkdownRenderer } from "./markdown-renderer";
import { Ratings } from "./ratings";
import { Ticket } from "./ticket";

export function ArticlePage() {

  const { articleDelimiter } = useSearchContext();
  const { article } = useArticle(articleDelimiter);

  const { data, markdown } = parseContent(article?.text || "");

  return (
    <ThemedView style={styles.container}>
      <ArticleHeader locationText={articleDelimiter.location} style={styles.header} />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.content}>
          <Ticket delimiter={articleDelimiter} content={data} style={styles.ticket} />
          <MarkdownRenderer style={styles.markdown} markdown={markdown} />
        </ThemedView>
      </ScrollView>
      <View style={styles.lowBar}>
        <Ratings positive={4} negative={1} available={true} userRating="negative" style={styles.ratings} />
        <DownloadButton available={true} onPress={() => {}} />
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