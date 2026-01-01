import { Colors } from "@/constants/theme";
import { useColorScheme, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
    </View>
  );
}
