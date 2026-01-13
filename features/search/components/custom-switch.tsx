import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";

export type CustomSwitchProps = {
  values: {
    label: string;
    value?: string;
  }[]
  backgroundColor?: {
    light: string;
    dark: string;
  }
  selectionColor?: {
    light: string;
    dark: string;
  }
}

export const CustomSwitch = ({
  values,
  backgroundColor,
  selectionColor,
}: CustomSwitchProps) => {
  const bgColor = useThemeColor({ light: backgroundColor?.light, dark: backgroundColor?.dark }, "background");
  const selectColor = useThemeColor({ light: selectionColor?.light, dark: selectionColor?.dark }, "secondary");
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* TODO: Map values  */}
      {/* TODO: Handle selection  */}
      {/* TODO: Between lines  */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    borderRadius: 16,
  }
});