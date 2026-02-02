import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { ListEntry } from "@/features/articles/components/list-entry";
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

      <ThemedText style={{textAlign: "center"}} type="title">Travelogy</ThemedText>
      <SearchMenu />
      <ListEntry location="Footplace ; Foottown" articleId={1} tag="Bus" onDelete={(id) => console.log("Delete article", id)} onPress={(id) => console.log("Press article", id)} />
    </View>
  );
}