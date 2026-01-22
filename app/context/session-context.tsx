import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";
import { USER_ID_STORE } from "../../constants/config";
import { fetchNewUserId } from "../api/session";

export type SessionContextType = {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

export const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({children}: {children: React.ReactNode}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

// TODO: Handle errors

  useEffect(() => {
    async function initializeSession() {
      try {
        let idToBeSet: string | null = null;
        idToBeSet = await SecureStore.getItemAsync(USER_ID_STORE);
        if (!idToBeSet) {
          idToBeSet = await fetchNewUserId();
          if (idToBeSet) await SecureStore.setItemAsync(USER_ID_STORE, idToBeSet);
        }
        setUserId(idToBeSet);
        setIsReady(true);
      } catch (error) {
        console.error("Failed to load user ID.");
        setUserId(null);
        setIsReady(true);
      }
    }

    initializeSession();
  }, []);

  if (!isReady) {
    return null;
  }

  return(
    <SessionContext.Provider value={{userId, setUserId}}>
      {children}
    </SessionContext.Provider>
  )
}