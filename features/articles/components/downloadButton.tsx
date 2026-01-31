import { ThemedSvg } from "@/components/themed-svg";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { DownloadIcon } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";

export type DownloadButtonProps = {
  onPress: () => void;
  available? : boolean;
  style?: object;
};

export function DownloadButton({ onPress, available, style }: DownloadButtonProps) {
  return(
    <ThemedView
      lightColor={Colors.light.secondary}
      darkColor={Colors.dark.secondary}
      style={[styles.container, style, available ? {} : { backgroundColor: useThemeColor({}, 'unavailable') }]}
    >
      <Pressable onPress={onPress}>
        <ThemedSvg icon={DownloadIcon} size={32} />
      </Pressable>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    height: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});