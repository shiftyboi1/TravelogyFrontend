import { FontSizes } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  order?: 'primary' | 'secondary' ;
  type?: 'default' | 'title' | 'header' | 'defaultBold' | 'subtitle' | 'link';
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  order,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, order === 'secondary' ? 'textSecondary' : 'text');
  
  return(
    <Text
    style = {[
      {color},
      type ==='default' ? {fontSize:FontSizes.default} : undefined,
      type ==='header' ? {fontSize:FontSizes.header, fontWeight:'bold'} : undefined,
      type ==='title' ? {fontSize:FontSizes.title, fontWeight:'bold'} : undefined,
      type ==='defaultBold' ? {fontSize:FontSizes.default, fontWeight:'600'} : undefined,
      type ==='subtitle' ? {fontSize:FontSizes.subtitle} : undefined,
      type ==='link' ? {fontSize:FontSizes.default, color:'#0a7ea4'} : undefined,
      style,
    ]}
    {...rest}
    />
  )
}