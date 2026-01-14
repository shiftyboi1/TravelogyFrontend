import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { useSearchContext } from "../context/search-context";
import { CustomDropdown } from "./custom-dropdown";
import { CustomSwitch } from "./custom-switch";
import { SearchTrigger } from "./search-trigger";

export function SearchMenu() {
  const { searchedTerm, setSearchedTerm } = useSearchContext();
  
  // TODO: One-of-two selector for city/country
  // TODO: Dropdown menu for type of transportation
  // TODO: Search button
  // TODO: Style

  return (
    <ThemedView lightColor={Colors.light.primary} darkColor={Colors.dark.primary} style={styles.containerView}>
      
      <CustomSwitch callback={() => {}} values={["doggo", "cato"]} />
      <SearchTrigger style={{ margin: 16 }} searchedTerm={searchedTerm} />
      <CustomDropdown 
      callback={() => {}}
      data={[
          { label: "Option nnula", value: "0" },
          { label: "Option jeden", value: "1" },
        ]}
        labelField={"label"}
        valueField={"value"}
        onChange={(item) => {}}
      />

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    margin: 16
  },
});
