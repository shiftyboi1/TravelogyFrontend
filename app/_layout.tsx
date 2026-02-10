import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { LanguageProvider } from "@/context/language-context";
import { SessionProvider } from "@/context/session-context";
import { OptionsContextProvider } from "@/features/search/context/options-context";
import { SearchContextProvider } from "@/features/search/context/search-context";
import { initDatabase } from "@/services/database";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <LanguageProvider>
        <SessionProvider>
          <OptionsContextProvider>
            <SearchContextProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false}} />
                <Stack.Screen name="search" options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  headerStyle: {
                    backgroundColor: Colors[colorScheme ?? "light"].primary,
                  },
                  headerTintColor: Colors[colorScheme ?? "light"].textSecondary,
                  headerShadowVisible: false,
                  headerTitle: "Search",
                  }} />
                  <Stack.Screen name="article" options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  headerTransparent: true,
                  headerTintColor: Colors[colorScheme ?? "light"].textSecondary,
                  headerShadowVisible: false,
                  headerTitle: "",
                  }} />
              </Stack>
            </SearchContextProvider>
          </OptionsContextProvider>
        </SessionProvider>
      </LanguageProvider>
    </ThemedView>
  );
}
