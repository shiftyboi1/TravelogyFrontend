import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { SearchMenu } from "@/features/search/components/search-menu";
import { useColorScheme, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();

  //TODO: fake clickable textfield
  //TODO: dropdown menu with varied string entries
  //TODO: Search button
  //TODO: left/right choice thing (single choice in a row, underlines)
  //TODO: entry in saved list
  //TODO: Saved list
  //TODO: Search land

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors[colorScheme ?? "light"].primary,
      }}
    >
      <ThemedText type="subtitle">
        I have paws
      </ThemedText>

      <SearchMenu />

    </View>
  );
}
