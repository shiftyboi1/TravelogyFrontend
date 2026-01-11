import { SearchContextProvider } from "@/features/search/context/search-context";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SearchContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
      </Stack>
    </SearchContextProvider>
  );
}
