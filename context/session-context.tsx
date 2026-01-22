import { ThemedText } from "@/components/themed-text";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import { fetchNewUserId } from "../api/session";
import { USER_ID_STORE } from "../constants/config";

export type SessionContextType = {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

export const SessionContext = createContext<SessionContextType | null>(null);

SplashScreen.preventAutoHideAsync();

export function SessionProvider({children}: {children: React.ReactNode}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

// TODO: Handle errors

  useEffect(() => {
    async function initializeSession() {
      try {
        let idToBeSet = await SecureStore.getItemAsync(USER_ID_STORE);
        
        if (idToBeSet) {
          await SplashScreen.hideAsync();
        } else {
          idToBeSet = await fetchNewUserId();
          if (idToBeSet) await SecureStore.setItemAsync(USER_ID_STORE, idToBeSet);
        }
        setUserId(idToBeSet);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to connect. Please check your internet connection and try again.");
        setUserId(null);
        setIsLoading(false);
      }
    }
    initializeSession();
  }, []);

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  return(
    <SessionContext.Provider value={{userId, setUserId}}>
      {children}
    </SessionContext.Provider>
  )
}