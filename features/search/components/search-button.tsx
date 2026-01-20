import searchIcon from "@/assets/svg/icons/Search";
import { ThemedSvg } from "@/components/themed-svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { Pressable, StyleSheet, View } from "react-native";

export function SearchButton(params: { onPress?: () => void }) {
  return (
    <View style={styles.outerFlex}>
      <Pressable onPress={params.onPress}>
        <ThemedView style={styles.container} lightColor={Colors.light.secondary} darkColor={Colors.dark.secondary} >
          <ThemedText lightColor={Colors.light.textSecondary} darkColor={Colors.dark.textSecondary} style={styles.text}>Search</ThemedText>
          <ThemedSvg lightColor={Colors.light.textSecondary} darkColor={Colors.dark.textSecondary} size={24} icon={searchIcon} style={styles.icon} />
        </ThemedView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 60,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 5,
  },
  outerFlex: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginHorizontal: 16
  },
  text: {
    marginLeft: 16
  }
});