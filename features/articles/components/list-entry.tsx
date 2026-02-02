import { ThemedSvg } from "@/components/themed-svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { Trash2 } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";

export type ListEntryProps = {
  location: string;
  articleId: number;
  tag: string;
  onDelete: (id: number) => void;
  onPress: (id: number) => void;
  style? : object;
};

export function ListEntry({ location, articleId, tag, onDelete, onPress, style }: ListEntryProps) {
  return (
    <ThemedView lightColor={Colors.light.secondary} darkColor={Colors.dark.secondary} style={[styles.container, style]}>
      <Pressable style={styles.leftColumn} onPress={() => onPress(articleId)}>
        <ThemedView lightColor={Colors.light.primary} darkColor={Colors.dark.primary} style={styles.leftColumnContent}>
          <ThemedText type="defaultBold">{location}</ThemedText>
          <ThemedText type="subtitle">{tag}</ThemedText>
        </ThemedView>
      </Pressable>
      <Pressable style={({pressed}) => [styles.deleteButton, pressed ? styles.pressed : {}]} onPress={() => onDelete(articleId)}>
        <ThemedSvg icon={Trash2} size={32} />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressable: {
    flex: 1,
  },
  leftColumn: {
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
  },
  leftColumnContent: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  pressed: {
    transform: [{ scale: 0.90 }],
  },
});