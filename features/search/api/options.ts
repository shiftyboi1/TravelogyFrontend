import { client } from "@/api/client";
import { DropdownOptions } from "@/features/search/context/options-context";

export function fetchTagOptions(): Promise<DropdownOptions> {
  return client<DropdownOptions>("/options");
}