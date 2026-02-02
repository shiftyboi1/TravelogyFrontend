import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { ListEntry } from "@/features/articles/components/list-entry";
import { ArticlePreview } from "@/features/articles/types/types";
import { FlatList, StyleSheet } from "react-native";
import { useSavedArticles } from "../hooks/use-saved-articles";

export type DownloadedListProps = {
  style?: object;
};

export function DownloadedList({ style }: DownloadedListProps) {
  const { articles, isLoading, deleteArticle, refresh } = useSavedArticles();
  
  return (
    <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={[styles.container, style]}>
      <FlatList<ArticlePreview>
        data={articles}
        keyExtractor={(item) => item.articleId.toString()}
        onRefresh={refresh}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <ListEntry
            location={item.location}
            articleId={item.articleId}
            tag={item.tag}
            onDelete={(id) => deleteArticle(id)}
            onPress={() => {}} 
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: 'row',
    borderColor: "#FFFFFF",
    borderWidth: 1,
    margin: 17,
  },
});