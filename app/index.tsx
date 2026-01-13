import { Colors } from "@/constants/theme";
import { CustomSwitch } from "@/features/search/components/custom-switch";
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
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
    
      <SearchMenu />

      <CustomSwitch values={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
      ]} 
      backgroundColor={{ light: Colors.light.primary, dark: Colors.dark.primary }} />

    </View>
  );
}
