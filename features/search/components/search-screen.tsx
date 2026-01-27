import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { FontSizes } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { StyleSheet, TextInput } from "react-native";
import { useSearchContext } from "../context/search-context";

export function SearchScreen() {
  const { articleDelimiter, setArticleDelimiter } = useSearchContext();
  const bannerBackgroundColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = `${textColor}80`; // 50% opacity (80 in hex)
  const router = useRouter();

  function onSubmit() {
    if (articleDelimiter.location.trim().length === 0) return;
    router.back();
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ThemedView style={[styles.banner, { backgroundColor: bannerBackgroundColor }]}>
        <TextInput 
          placeholder="Search for a location" 
          placeholderTextColor={placeholderColor}
          value={articleDelimiter.location}
          onChangeText={(text) => setArticleDelimiter({ ...articleDelimiter, location: text })}
          autoFocus={true}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          style={[styles.searchInput, 
            { fontSize: FontSizes.default, color: textColor, backgroundColor: backgroundColor }]}
        />
      </ThemedView>
      <ThemedText></ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    padding: 16
  },
  searchInput: {
    height: 60,
    paddingLeft: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
})