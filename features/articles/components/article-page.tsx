import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet } from "react-native";
import { ArticleHeader } from "./article-header";

export function ArticlePage() {
  return (
    <ThemedView style={styles.container}>
      <ArticleHeader locationText="Malmö ; Sweden" style={styles.header} />
      <ScrollView style={{ zIndex: 1, overflow: 'visible' }}>
        <ThemedView style={styles.content}>
          <ThemedText style={{ fontSize: 24, fontWeight: 'bold'}}>PAWS</ThemedText>
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
    elevation: 20,
    marginTop: 200,
    borderRadius: 16,
    height: 2000,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
});