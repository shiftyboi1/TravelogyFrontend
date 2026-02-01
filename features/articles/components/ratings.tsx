import { ThemedSvg } from "@/components/themed-svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

export type RatingsProps = {
  positive: number;
  negative: number;
  available?: boolean;
  userRating?: 'positive' | 'negative';
  style?: object;
};

export function Ratings({ positive = 0, negative = 0, available = false, userRating, style }: RatingsProps) {
  const unavailableColor = useThemeColor({}, 'unavailable');

  const positiveColor = "#4CAF50"
  const negativeColor = "#F44336"

  const [positiveRatings, setPositiveRatings] = useState(positive);
  const [negativeRatings, setNegativeRatings] = useState(negative);
  const [currentUserRating, setCurrentUserRating] = useState(userRating);

  // TODO: Send to API

  function handlePress(rating: 'positive' | 'negative') {
    if (!available || currentUserRating === rating ) return;
    if (rating === 'positive') {
      setPositiveRatings(positiveRatings + 1);
      setNegativeRatings(Math.max(0, negativeRatings - 1));
    } else {
      setNegativeRatings(negativeRatings + 1);
      setPositiveRatings(Math.max(0, positiveRatings - 1));
    }    
    setCurrentUserRating(rating);
  }

  return (
    <ThemedView lightColor={Colors.light.backgroundSecondary} darkColor={Colors.dark.backgroundSecondary} style={[styles.container, style]}>
      <View style={styles.leftRow}>
        <View style={styles.topRow}>
          <ThemedText style={{ color: positiveColor }}>{positiveRatings}</ThemedText>
          <ThemedText style={{ opacity: 0.5 }}>/</ThemedText>
          <ThemedText style={{ color: negativeColor }}>{negativeRatings}</ThemedText>
        </View>
        <ProgressBar 
          progress={positiveRatings + negativeRatings === 0 ? 0 : positiveRatings / (positiveRatings + negativeRatings)} 
          width={null} 
          color={positiveRatings + negativeRatings === 0 ? unavailableColor : positiveColor} 
          unfilledColor={positiveRatings + negativeRatings === 0 ? unavailableColor : negativeColor}
          borderWidth={0}
          height={10}
          style={{ marginTop: 8, borderRadius: 5 }}
        />
      </View>
      <View style={styles.ratingButtonsView}>
        <Pressable disabled={!available} style={({ pressed }) => pressed ? styles.pressed : {}} onPress={() => handlePress('positive')}>
          <ThemedView style={[styles.ratingButton, {
            backgroundColor: available ? positiveColor : unavailableColor,
            opacity: currentUserRating === 'negative' ? 0.7 : 1,
            transform: [{ scale: currentUserRating === 'negative' ? 0.95 : 1 }],
            }]}>
            <ThemedSvg icon={ThumbsUpIcon} />
          </ThemedView>
        </Pressable>
        <Pressable disabled={!available} style={({ pressed }) => pressed ? styles.pressed : {}} onPress={() => handlePress('negative')}>
          <ThemedView style={[styles.ratingButton, {
            backgroundColor: available ? negativeColor : unavailableColor,
            opacity: currentUserRating === 'positive' ? 0.7 : 1,
            transform: [{ scale: currentUserRating === 'positive' ? 0.95 : 1 }],
            }]}>
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
  pressed: {
    transform: [{ scale: 0.9 }],
  },
});