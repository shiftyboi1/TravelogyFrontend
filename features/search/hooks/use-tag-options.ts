import { DataKey, SaveFileSystem, StorageLocation } from "@/services/save-file-system";
import { useEffect, useState } from "react";
import { fetchTagOptions } from "../api/options";

export type DropdownOption = {
  internalText: string;
  displayText: string;
  type: string;
};

export type DropdownOptions = {
  city: DropdownOption[];
  country: DropdownOption[];
};

export function useTagOptions() {
  // const [options, setOptions] = useState<DropdownOption[]>([]);
  const [allOptions, setAllOptions] = useState<DropdownOptions>({ city: [], country: [] });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        // 1. Check Local Storage FIRST
        const localData = await SaveFileSystem.get<DropdownOptions>(StorageLocation.DATA, DataKey.TAGS);
        
        if (isMounted && localData) {
          console.debug("Loaded tags from cache");
          setAllOptions(localData);
        }

        // 2. Then Fetch Remote (Always update in background)
        const remoteData = await fetchTagOptions();
        
        if (isMounted && remoteData) {
          // Only update state if data actually changed to prevent re-renders (optional deep check)
          setAllOptions(remoteData); 
          
          // 3. Save to file system
          await SaveFileSystem.set(StorageLocation.DATA, DataKey.TAGS, remoteData);
        }
      } catch (e) {
        console.warn("Failed to load tag options", e);
      }
    };

    loadData();

    return () => { isMounted = false; };
  }, []); // Dependency array is empty, ensuring this runs once on mount

  return { allOptions };
}