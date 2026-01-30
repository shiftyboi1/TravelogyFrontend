import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

export type ArticleHeaderProps = {
  locationText: string;
  style?: object;
};

export function ArticleHeader({ locationText, style }: ArticleHeaderProps) {
  const [location, locationSecondary] = locationText.split(' ; ');
  
  return (
    <ThemedView lightColor={Colors.light.primary} darkColor={Colors.dark.primary} style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <ThemedText type="title" lightColor={Colors.light.textSecondary}>{location}</ThemedText>
        {locationSecondary && <ThemedText type="subtitle" lightColor={Colors.light.textSecondary}>{locationSecondary.toUpperCase()}</ThemedText>}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});