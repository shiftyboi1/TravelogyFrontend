import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet } from "react-native";
import { ArticleDelimiter } from "../types/types";
import { ArticleHeader } from "./article-header";
import { MarkdownRenderer } from "./markdown-renderer";
import { Ticket } from "./ticket";

const testDelimiter : ArticleDelimiter= {
  location: "Malmö ; Sweden",
  tag: "bus",
  type: "city"
};

const testContent = {
  operatingHours: "12:00 - 21:30",
  relativePrice: "MID" as 'LOW' | 'MID' | 'HIGH',
};

export function ArticlePage() {
  return (
    <ThemedView style={styles.container}>
      <ArticleHeader locationText={testDelimiter.location} style={styles.header} />
      <ScrollView style={{ zIndex: 1, overflow: 'visible' }}>
        <ThemedView style={styles.content}>
          <Ticket delimiter={testDelimiter} content={testContent} style={{ margin: 16 }} />
          <MarkdownRenderer markdown={""} />
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
    minHeight: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
});