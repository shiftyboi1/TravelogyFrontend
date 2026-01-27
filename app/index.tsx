import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { SearchMenu } from "@/features/search/components/search-menu";
import { useColorScheme, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();

  //TODO: entry in saved list
  //TODO: Saved list

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >

      <ThemedText style={{textAlign: "center"}} type="header">Travelogy</ThemedText>
      <SearchMenu />
    </View>
  );
}