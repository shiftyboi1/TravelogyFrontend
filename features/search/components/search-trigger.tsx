import SearchIcon from "@/assets/svg/icons/Search";
import { ThemedSvg } from "@/components/themed-svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export function SearchTrigger({ searchedTerm }: { searchedTerm?: string }) {
  const router = useRouter();
  
  return (
    <Pressable onPress={() => router.push("/search")}>
      <ThemedView type="textInputContainer">
        <ThemedSvg icon={SearchIcon} size={30} style={styles.icon} />
        <ThemedText type="title" style={searchedTerm ? undefined : styles.placeholder}>{searchedTerm || "Search"}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 16,
  },
  placeholder: {
    opacity: 0.5,
  }
});