import { ThemedView } from "@/components/themed-view";
import { FontSizes } from "@/constants/theme";
import { useLanguage } from "@/context/language-context";
import { useSearchContext } from "@/features/search/context/search-context";
import { useAutocompleteOptions } from "@/features/search/hooks/useAutocomplete";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { SearchOptionsList } from "./search-options-list";

export function SearchScreen() {
  const { articleDelimiter, setArticleDelimiter } = useSearchContext();
  const bannerBackgroundColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = `${textColor}80`; // 50% opacity (80 in hex)
  const router = useRouter();
  const {t} = useLanguage();

  const [input, setInput] = useState("");
  const debouncedInput = useDebouncedValue(input, 200);

  const options = useAutocompleteOptions(debouncedInput, articleDelimiter.type);

  function useDebouncedValue<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
  }

  function handleSelect(value: string) {
    setArticleDelimiter({
      ...articleDelimiter,
      location: value,
    });
    router.back();
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ThemedView style={[styles.banner, { backgroundColor: bannerBackgroundColor }]}>
        <TextInput 
          placeholder={t("text.search_placeholder")} 
          placeholderTextColor={placeholderColor}
          onChangeText={setInput}
          autoFocus={true}
          returnKeyType="search"
          style={[styles.searchInput, 
            { fontSize: FontSizes.default, color: textColor, backgroundColor: backgroundColor }]}
        />
      </ThemedView>
      <SearchOptionsList options={options} written={input} onSelect={handleSelect} />
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