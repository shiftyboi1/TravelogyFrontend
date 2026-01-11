import { TextInput, View } from "react-native";
import { useSearchContext } from "../context/search-context";

export function SearchScreen() {
  const { searchedTerm, setSearchedTerm } = useSearchContext();

  return (
    <View>
      <TextInput 
        placeholder="Search Screen" 
        value={searchedTerm}
        onChangeText={setSearchedTerm}
      />
    </View>
  );
}