import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet } from "react-native";
import { ArticleHeader } from "./article-header";
import { MarkdownRenderer } from "./markdown-renderer";

export function ArticlePage() {
  return (
    <ThemedView style={styles.container}>
      <ArticleHeader locationText="Malmö ; Sweden" style={styles.header} />
      <ScrollView style={{ zIndex: 1, overflow: 'visible' }}>
        <ThemedView style={styles.content}>
          <MarkdownRenderer />
        </ThemedView>
      </ScrollView>
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
  content: {
    marginTop: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
});