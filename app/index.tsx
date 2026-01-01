import { ThemedText } from "@/components/elements/themed-text";
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
      <ThemedText type="title" darkColor={Colors.dark.primary}>
        Ashley
      </ThemedText>
      <ThemedText type="default">
        Big
      </ThemedText>
      <ThemedText type="defaultBold">
        nay, LARGE
      </ThemedText>
      <ThemedText type="link">
        I have paws
      </ThemedText>
      <ThemedText type="subtitle">
        I have paws
      </ThemedText>
    </View>
  );
}
