import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchNewUserId } from "../api/session";
import { USER_ID_STORE } from "../constants/config";

export type SessionContextType = {
  userId: string | null;
  setUserId: (id: string | null) => void;
  isLoading?: boolean;
}

const SessionContext = createContext<SessionContextType | null>(null);

SplashScreen.preventAutoHideAsync();

export function SessionProvider({children}: {children: React.ReactNode}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

// TODO: Handle errors

  useEffect(() => {
    async function initializeSession() {

      await SplashScreen.hideAsync();
      try {
        let idToBeSet = await SecureStore.getItemAsync(USER_ID_STORE);
        
        if (!idToBeSet ) {
          idToBeSet = await fetchNewUserId();
          // if (idToBeSet) await SecureStore.setItemAsync(USER_ID_STORE, idToBeSet);
        }
        if (idToBeSet === null) throw new Error("Failed to obtain user ID");
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

  return(
    <SessionContext.Provider value={{userId, setUserId, isLoading}}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
    const context = useContext(SessionContext);
    if (!context) {
      throw new Error("useSessionContext must be used within a SessionProvider");
    }
    return context;
  }