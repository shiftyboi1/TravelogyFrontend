import { LOCATION_DELIMITER } from "@/constants/config";
import { SearchEntry } from "./search-entry";

export type SearchOptionsListProps = {
  options: Array<{
    location: string;
    locationSecondary?: string;
  }>;
  written: string;
  onSelect: (value: string) => void;
};

export function SearchOptionsList({ options, written, onSelect }: SearchOptionsListProps) {
  function handleSelect(index: number) {
    onSelect(options[index].location + (options[index].locationSecondary ? LOCATION_DELIMITER + options[index].locationSecondary : ""));
  }

  return (
    <>
      {options.map((option, index) => (
        <SearchEntry
          key={index}
          index={index}
          onSelect={handleSelect}
          location={option.location}
          locationSecondary={option.locationSecondary}
        />
      ))}
    </>
  );
}


