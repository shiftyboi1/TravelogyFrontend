import { client } from "@/api/client";
import { CityAutocompleteResponse, CountryAutocompleteResponse } from "@/features/search/hooks/useAutocomplete";

export async function fetchAutocompleteCity(inputValue: string): Promise<CityAutocompleteResponse> {
  try {
    return await client<CityAutocompleteResponse>(`/city/${inputValue}`);
  } catch (error) {}
  return { cities : [], count: 0 };
}

export async function fetchAutocompleteCountry(inputValue: string): Promise<CountryAutocompleteResponse> {
  try {
    return await client<CountryAutocompleteResponse>(`/country/${inputValue}`);
  } catch (error) {}
  return { countries: [], count: 0 };
}