import { useThemeColor } from "@/hooks/useThemeColor";
import { SvgProps } from "react-native-svg";

export type ThemedSvgProps = SvgProps & {
  icon: React.FC<SvgProps>;
  lightColor?: string;
  darkColor?: string;
  size?: number;
}

export function ThemedSvg({
  icon: Icon,
  lightColor,
  darkColor,
  size = 24,
  style,
  ...rest
}: ThemedSvgProps) {
  const color = useThemeColor({ light: lightColor, dark:darkColor }, 'text')
  return(
    <Icon
      width={size}
      height={size}
      color={color}
      style={style}
      {...rest}
    />
  )
}