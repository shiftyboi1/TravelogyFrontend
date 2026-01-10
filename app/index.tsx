import SearchIcon from "@/assets/svg/icons/Search";
import { ThemedSvg } from "@/components/themed-svg";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
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
        alignItems: "center",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <ThemedText type="header" darkColor={Colors.dark.secondary}>
        67
      </ThemedText>
      <ThemedText type="default">
        Big
      </ThemedText>
      <ThemedText type="title">
        jestem tytułem
      </ThemedText>
      <ThemedText type="defaultBold">
        nay, LARGE
      </ThemedText>
      <ThemedText type="link">
        I have paws
      </ThemedText>
      <ThemedText type="subtitle">
        I have paws
      </ThemedText>

      <ThemedSvg icon={SearchIcon} size={24} />
    </View>
  );
}
