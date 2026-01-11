import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { useSearchContext } from "../context/search-context";
import { SearchTrigger } from "./search-trigger";

export function SearchMenu() {
  const { searchedTerm, setSearchedTerm } = useSearchContext();
  
  // TODO: One-of-two selector for city/country
  // TODO: Dropdown menu for type of transportation
  // TODO: Search button
  // TODO: Style

  return (
    <ThemedView lightColor={Colors.light.primary} darkColor={Colors.dark.primary} style={styles.container}>
      <SearchTrigger style={{ margin: 16 }} searchedTerm={searchedTerm} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    margin: '5%'
  },
});
