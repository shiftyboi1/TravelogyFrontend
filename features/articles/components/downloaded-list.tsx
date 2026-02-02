import { ListEntry } from "@/features/articles/components/list-entry";
import { ArticlePreview } from "@/features/articles/types/types";
import { FlatList } from "react-native";

export function DownloadedList() {
  return (
    <FlatList<ArticlePreview>
      data={[]}
      keyExtractor={(item) => item.articleId.toString()}
      renderItem={({ item }) => (
        <ListEntry
          location={item.location}
          articleId={item.articleId}
          tag={item.tag}
          onDelete={() => {}}
          onPress={() => {}} 
        />
      )}
    />
  );
}