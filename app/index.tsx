import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { CustomSwitch } from "@/features/search/components/custom-switch";
import { SearchMenu } from "@/features/search/components/search-menu";
import { useState } from "react";
import { useColorScheme, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
    
      <ThemedText>{["doggo", "cato"][selectedIndex]}</ThemedText>

      <CustomSwitch callback={setSelectedIndex} values={["doggo", "cato"]} 
      backgroundColor={{ light: Colors.light.primary, dark: Colors.dark.primary }} />

      <SearchMenu />

    </View>
  );
}
