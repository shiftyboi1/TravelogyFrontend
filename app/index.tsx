import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useLanguage } from "@/context/language-context";
import { DownloadedList } from "@/features/articles/components/downloaded-list";
import { SearchMenu } from "@/features/search/components/search-menu";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();
  const {t} = useLanguage();

  return (
    <View
      style={[styles.container,{
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }]}
    >
      <ThemedView lightColor={Colors.light.secondary} darkColor={Colors.dark.secondary} style={styles.topDiv}>
        <ThemedText style={styles.topText} lightColor={Colors.light.textSecondary} darkColor={Colors.dark.textSecondary} type="title">Travelogy</ThemedText>
      </ThemedView>

      <SearchMenu style={styles.searchMenu} />
      <View style={styles.bottomDiv}>
        <ThemedText style={{textAlign: "center"}} type="header">{t("text.saved_articles")}</ThemedText>
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