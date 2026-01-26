import { fetchTagOptions } from "@/features/search/api/options";
import { DataKey, SaveFileSystem, StorageLocation } from "@/services/save-file-system";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type DropdownOption = {
  internalText: string;
  displayText: string;
  type: string;
};

export type DropdownOptions = {
  city: DropdownOption[];
  country: DropdownOption[];
};

type OptionsContextType = {
  tagOptions: DropdownOptions;
  // setTagOptions: (options: DropdownOptions) => void;
}

const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export function OptionsContextProvider({ children }: { children: ReactNode }) {
  const [tagOptions, setTagOptions] = useState<DropdownOptions>({ city: [], country: [] });

  useEffect(() => {
    console.log("The evil is running.");
    let isMounted = true;
  
    const loadData = async () => {
      try {
        const localData = await SaveFileSystem.get<DropdownOptions>(StorageLocation.DATA, DataKey.TAGS);
          
        if (isMounted && localData) {
          setTagOptions(localData);
        }

        const remoteData = await fetchTagOptions();

        if (isMounted && remoteData) {
          setTagOptions(remoteData);
            await SaveFileSystem.set(StorageLocation.DATA, DataKey.TAGS, remoteData);
          }
        } catch (e) {
          console.warn("Failed to load tag options", e);
        }
      };
    loadData();
    }, []); // Dependency array is empty, ensuring this runs once on mount

  return (
    <OptionsContext.Provider value={{ tagOptions }}>
      {children}
    </OptionsContext.Provider>
  );
}

export function useOptionsContext() {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("useOptionsContext must be used within an OptionsProvider");
  }
  return context;
}