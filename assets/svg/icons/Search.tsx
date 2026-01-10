import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Circle, Path } from "react-native-svg";
const SvgSearch = (props: SvgProps) => (
  <Svg
    viewBox="0 0 788 788"
    width="100%"
    height="100%"
    fill="none"
    {...props}
  >
    <Circle cx={325} cy={325} r={275} stroke="currentColor" strokeWidth={100} />
    <Path
      fill="currentColor"
      d="M680.805 769.193c24.407 24.409 63.98 24.409 88.388.002s24.409-63.98.002-88.388L725 725zM725 725l44.195-44.193-200.006-200.015-44.195 44.193-44.196 44.193 200.007 200.015z"
    />
  </Svg>
);
export default SvgSearch;
