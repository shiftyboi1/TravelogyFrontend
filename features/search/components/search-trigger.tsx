import SearchIcon from "@/assets/svg/icons/Search";
import { ThemedSvg } from "@/components/themed-svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";

export function SearchTrigger({ searchedTerm, style }: { searchedTerm?: string; style?: StyleProp<ViewStyle> }) {
  const router = useRouter();
  const placeholderText = "Where are you going?";

  return (
    <Pressable onPress={() => router.push("/search")} style={style}>
      <ThemedView type="textInputContainer">
        <ThemedSvg icon={SearchIcon} size={24} style={styles.icon} />
        <ThemedText type="default" style={searchedTerm ? undefined : styles.placeholder}>{searchedTerm || placeholderText}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    margin: 16,
  },
  placeholder: {
    opacity: 0.5,
  }
});