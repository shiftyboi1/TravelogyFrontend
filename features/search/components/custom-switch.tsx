import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export type CustomSwitchProps = {
  callback: (selectedIndex: number) => void;
  values: string[]
  backgroundColor?: {
    light: string;
    dark: string;
  }
  selectionColor?: {
    light: string;
    dark: string;
  }
}

// TODO: Pass in a callback for when selection changes

export function CustomSwitch({
  callback,
  values,
  backgroundColor,
  selectionColor,
}: CustomSwitchProps) {
  const bgColor = useThemeColor({ light: backgroundColor?.light, dark: backgroundColor?.dark }, "background");
  const selectColor = useThemeColor({ light: selectionColor?.light, dark: selectionColor?.dark }, "secondary");
  if (values.length === 0) { values = [ "WHOOPS"]; }
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {values.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => { setSelectedIndex(index); callback(index); }} style={[styles.item, (index === selectedIndex && styles.selected)]}>
            <ThemedText lightColor={Colors.light.textSecondary} darkColor={Colors.dark.textSecondary} order={index === selectedIndex ? 'primary' : 'secondary'}>
              {item}
            </ThemedText>
          </Pressable>
          {index < values.length - 1 && <ThemedText style={styles.divider}>|</ThemedText>}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  selected: {
    backgroundColor: 'blue',
  },
  divider: {
    opacity: 0.5,
  },
});