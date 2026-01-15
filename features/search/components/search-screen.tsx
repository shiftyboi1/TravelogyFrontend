import { ThemedView } from "@/components/themed-view";
import { StyleSheet, TextInput } from "react-native";
import { useSearchContext } from "../context/search-context";

export function SearchScreen() {
  const { searchedTerm, setSearchedTerm } = useSearchContext();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.banner}>
        <TextInput 
          placeholder="Search Screen" 
          value={searchedTerm}
          onChangeText={setSearchedTerm}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
})