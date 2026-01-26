import { client } from "@/api/client";
import { DropdownOptions } from "../hooks/use-tag-options";

export function fetchTagOptions(): Promise<DropdownOptions> {
  return client<DropdownOptions>("/options");
}