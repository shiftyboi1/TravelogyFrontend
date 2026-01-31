import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TouchableOpacity } from "react-native";

export type SearchEntryProps = {
  index: number;
  onSelect: (index: number) => void;
  locationSecondary?: string;
  location: string;
}

export function SearchEntry({ index, onSelect, location, locationSecondary }: SearchEntryProps) {
  if (location.length === 0) return null; // No render if nothing written

  return (
    <ThemedView style={[styles.container, { borderColor: useThemeColor({}, 'text') + "40"}]}>
      <TouchableOpacity onPress={() => onSelect(index)} style={[styles.entry]}>
        {<ThemedText numberOfLines={1} ellipsizeMode="tail" type="header" style={locationSecondary ? styles.leftTextCity : styles.leftTextCountry}>{location}</ThemedText>}
        {locationSecondary && 
          <ThemedText type="subtitle" numberOfLines={1} ellipsizeMode="tail" style={styles.rightText}>{locationSecondary}</ThemedText>
        }
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    margin: 16,
    borderBottomWidth: 1,
    paddingBottom: 8
  },
  entry: {
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftTextCity: {
    textAlignVertical: 'center',
    maxWidth: '60%',
  },
  leftTextCountry: {
    textAlignVertical: 'center',
    maxWidth: '80%',
  },
  rightText: {
    textAlignVertical: 'center',
    maxWidth: '40%',
  }
});