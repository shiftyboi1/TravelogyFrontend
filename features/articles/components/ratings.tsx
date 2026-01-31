import { ThemedSvg } from "@/components/themed-svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

export type RatingsProps = {
  positive: number;
  negative: number;
  available?: boolean;
  style?: object;
};

export function Ratings({ positive = 0, negative = 0, available = false, style }: RatingsProps) {
  const positiveColor = positive > 0 ? "#4CAF50" : useThemeColor({}, 'unavailable');
  const negativeColor = negative > 0 ? "#F44336" : useThemeColor({}, 'unavailable');

  const positiveButtonColor = available ? "#4CAF50" : useThemeColor({}, 'unavailable');
  const negativeButtonColor = available ? "#F44336" : useThemeColor({}, 'unavailable');

  return (
    <ThemedView lightColor={Colors.light.backgroundSecondary} darkColor={Colors.dark.backgroundSecondary} style={[styles.container, style]}>
      <View style={styles.leftRow}>
        <View style={styles.topRow}>
          <ThemedText style={{ color: positiveColor }}>{positive}</ThemedText>
          <ThemedText style={{ opacity: 0.5 }}>/</ThemedText>
          <ThemedText style={{ color: negativeColor }}>{negative}</ThemedText>
        </View>
        <ProgressBar 
          progress={positive + negative === 0 ? 0 : positive / (positive + negative)} 
          width={null} 
          color={positiveColor} 
          unfilledColor={negativeColor}
          borderWidth={0}
          height={10}
          style={{ marginTop: 8, borderRadius: 5 }}
        />
      </View>
      <View style={styles.ratingButtonsView}>
        <Pressable>
          <ThemedView style={[styles.ratingButton, { backgroundColor: positiveButtonColor }]}>
            <ThemedSvg icon={ThumbsUpIcon} />
          </ThemedView>
        </Pressable>
        <Pressable>
          <ThemedView style={[styles.ratingButton, { backgroundColor: negativeButtonColor }]}>
            <ThemedSvg icon={ThumbsDownIcon} />
          </ThemedView>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    padding: 16,
    elevation: 10,
    flexDirection: 'row',
  },
  leftRow: {
    flex: 1,
    marginRight: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    alignItems: 'center',
  },
  ratingsView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingButtonsView: {
    flexDirection: 'row',
    gap: 12,
  },
  ratingButton: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});