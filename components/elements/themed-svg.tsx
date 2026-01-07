import { useThemeColor } from "@/hooks/useThemeColor";
import { SvgProps } from "react-native-svg";

export type ThemedSvgProps = SvgProps & {
  icon: React.FC<SvgProps>;
  lightColor?: string;
  darkColor?: string;
}

export function ThemedSvg({
  icon: Icon,
  lightColor,
  darkColor,
  ...rest
}: ThemedSvgProps) {
  const color = useThemeColor({ light: lightColor, dark:darkColor }, 'text')
  return(
    <Icon fill={color} {...rest}/>
  )
}