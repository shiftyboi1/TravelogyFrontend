import { useThemeColor } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'textInputContainer';
}

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  
  return <View style={[
    { backgroundColor },
    type === 'textInputContainer' ? {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 16,
      borderRadius: 16,
      width: '100%',
      height: 70
    } : undefined,
    style
  ]} {...otherProps} />;
}