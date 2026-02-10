import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchNewUserId } from "../api/session";
import { USER_ID_STORE } from "../constants/config";
import { useLanguage } from "./language-context";

export type SessionContextType = {
  userId: number | null;
  setUserId: (id: number | null) => void;
  isLoading?: boolean;
}

const SessionContext = createContext<SessionContextType | null>(null);

SplashScreen.preventAutoHideAsync();

export function SessionProvider({children}: {children: React.ReactNode}) {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {t} = useLanguage();

  useEffect(() => {
    async function initializeSession() {

      await SplashScreen.hideAsync();
      try {
        let idToBeSet = await SecureStore.getItemAsync(USER_ID_STORE) as number | null;
        
        if (!idToBeSet || idToBeSet === null) {
          idToBeSet = await fetchNewUserId();
          if (idToBeSet && idToBeSet !== null) await SecureStore.setItemAsync(USER_ID_STORE, String(idToBeSet));
        }
        if (idToBeSet === null) throw new Error(t("text.error.userid"));
        setUserId(idToBeSet);
        setIsLoading(true);
      } catch (error) {
        setError(t("text.error.connection"));
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