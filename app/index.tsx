import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { SearchMenu } from "@/features/search/components/search-menu";
import { useState } from "react";
import { useColorScheme, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  //TODO: Search button
  //TODO: entry in saved list
  //TODO: Saved list
  //TODO: Search land

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >

      <ThemedText style={{textAlign: "center"}} type="header">{["Doggo", "Cato"][selectedIndex]}</ThemedText>
      <SearchMenu />

    </View>
  );
}
