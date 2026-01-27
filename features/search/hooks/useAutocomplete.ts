import { useEffect, useState } from "react";
import { fetchAutocompleteCity, fetchAutocompleteCountry } from "../api/searchOptions";

export type AutocompleteOption = {
  location: string;
  locationSecondary?: string;
}

export type CityAutocompleteResponse = {
  count:number;
  cities: {
    cityName: string;
    countryName: string;
  }[];
}

export type CountryAutocompleteResponse = {
  count:number;
  countries: string[];
}



export function useAutocompleteOptions(inputValue: string, type: "city" | "country"): AutocompleteOption[] {
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchOptions() {
      let fetchedOptions: AutocompleteOption[] = [];
      switch (type) {
        case "city":
          const cityResponse = await fetchAutocompleteCity(inputValue);
          if (!cityResponse.cities) break;
          fetchedOptions = cityResponse.cities.map(city => ({
            location: city.cityName,
            locationSecondary: city.countryName
          }));
          break;
        case "country":
          const countryResponse = await fetchAutocompleteCountry(inputValue);
          if (!countryResponse.countries) break;
          fetchedOptions = countryResponse.countries.map(country => ({
            location: country,
          }));
          break;
      }
      if (isMounted) setOptions(fetchedOptions);
    }

    if (inputValue) fetchOptions();
    else setOptions([]);

    return () => { isMounted = false; }; // Cleanup
  }, [inputValue, type]);

  return options;
}