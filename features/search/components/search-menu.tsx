import { View } from "react-native";
import { useSearchContext } from "../context/search-context";
import { SearchTrigger } from "./search-trigger";

export function SearchMenu() {
  const { searchedTerm, setSearchedTerm } = useSearchContext();
  
  return (
    <View>
      <SearchTrigger style={{ margin: 16 }} searchedTerm={searchedTerm} />
    </View>
  );
}