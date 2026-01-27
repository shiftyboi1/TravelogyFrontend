import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useSessionContext } from "@/context/session-context";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useOptionsContext } from "../context/options-context";
import { useSearchContext } from "../context/search-context";
import { CustomDropdown } from "./custom-dropdown";
import { CustomSwitch } from "./custom-switch";
import { SearchButton } from "./search-button";
import { SearchTrigger } from "./search-trigger";

export function SearchMenu() {
  const [type, setType] = useState<"city" | "country">("country");
  const { searchedTerm, setSearchedTerm } = useSearchContext();
  const [mode, setMode] = useState("");

  const { isLoading } = useSessionContext();

  const { tagOptions } = useOptionsContext();
  const switchOpts = ["City", "Country"];

  function onSwitchChange(index: number) {
    if (index === 0) {
      setType("city");
    } else {
      setType("country");
    }
  }

  function onDropdownChange(selectedIndex: number) {
    setMode(tagOptions[type][selectedIndex].internalText);
  }

  useEffect(() => {
    // Reset searched term when type changes
    setSearchedTerm("");
  }, [type]);
  
  // TODO: Fix text wrap

  return (
    <ThemedView lightColor={Colors.light.primary} darkColor={Colors.dark.primary} style={styles.container}>
      <CustomSwitch callback={onSwitchChange} values={switchOpts} style={styles.switch} />
      <SearchTrigger searchedTerm={searchedTerm} style={styles.trigger} />
      <CustomDropdown 
      callback={onDropdownChange}
      style={styles.dropdown}
      data={type === "city" ? tagOptions.city : tagOptions.country}
        labelField={"displayText"}
        valueField={"internalText"}
        onChange={(item) => {}}
      />
      {isLoading ? <ThemedText style={styles.loadingText} lightColor={Colors.light.textSecondary}>Loading...</ThemedText> : <SearchButton />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 5,
  },
  dropdown: {
    margin: 16,
  },
  switch: {
    marginBottom: 16,
  },
  trigger: {
    marginBottom: 16,
  },
  loadingText: {
    textAlign: "center",
    margin: 14
  },
});
