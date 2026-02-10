import { FontSizes } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  order?: 'primary' | 'secondary' ;
  type?: 'header' | 'menu' | 'title' | 'titleBold' | 'default' | 'defaultBold' | 'subtitle' | 'link';
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  order,
  ...props
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, order === 'secondary' ? 'textSecondary' : 'text');
  
  return(
    <Text
    style = {[
      {color},
      type ==='header' ? {fontSize:FontSizes.header} : undefined,
      type ==='menu' ? {fontSize:FontSizes.menu} : undefined,
      type ==='title' ? {fontSize:FontSizes.title, fontWeight:'bold'} : undefined,
      type ==='titleBold' ? {fontSize:FontSizes.title, fontWeight:'bold'} : undefined,
      type ==='default' ? {fontSize:FontSizes.default} : undefined,
      type ==='defaultBold' ? {fontSize:FontSizes.default, fontWeight:'600'} : undefined,
      type ==='subtitle' ? {fontSize:FontSizes.subtitle, opacity: 0.7} : undefined,
      type ==='link' ? {fontSize:FontSizes.default, color:'#0a7ea4'} : undefined,
      style,
    ]}
    {...props}
    />
  )
}