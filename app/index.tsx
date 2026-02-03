import { ThemedView } from "@/app-example/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { DownloadedList } from "@/features/articles/components/downloaded-list";
import { SearchMenu } from "@/features/search/components/search-menu";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[styles.container,{
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }]}
    >
      <ThemedView lightColor={Colors.light.secondary} darkColor={Colors.dark.secondary} style={styles.topDiv}>
        <ThemedText style={styles.topText} type="title">Travelogy</ThemedText>
      </ThemedView>

      <SearchMenu style={styles.searchMenu} />
      <View style={styles.bottomDiv}>
        <ThemedText style={{textAlign: "center"}} type="header">Saved Articles</ThemedText>
      </View>
      <DownloadedList style={styles.downloadedList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  topDiv: {
    height: '15%',
    justifyContent: "center",
  },
  topText: {
    marginTop: 16,
    textAlign: "center",
  },
  bottomDiv: {
    justifyContent: "center",
    height: '7.5%',
  },
  searchMenu: {
    // marginHorizontal: 16,
  },
  downloadedList: {
    height: '39%',
    marginHorizontal: 16,
  },
});