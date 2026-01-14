import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { useSearchContext } from "../context/search-context";
import { CustomDropdown } from "./custom-dropdown";
import { CustomSwitch } from "./custom-switch";
import { SearchTrigger } from "./search-trigger";

export function SearchMenu() {
  const { searchedTerm, setSearchedTerm } = useSearchContext();
  
  // TODO: Search button
  // TODO: Style

  return (
    <ThemedView lightColor={Colors.light.primary} darkColor={Colors.dark.primary} style={styles.container}>
      <CustomSwitch callback={() => {}} values={["doggo", "cato"]} style={styles.switch} />
      <SearchTrigger searchedTerm={searchedTerm} style={styles.trigger} />
      <CustomDropdown 
      callback={() => {}}
      style={styles.dropdown}
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
  dropdown: {
    margin: 16,
  },
  switch: {
    marginBottom: 16,
  },
  trigger: {
    marginBottom: 16,
  }
});
