import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSearchContext } from "../context/search-context";
import { CustomDropdown } from "./custom-dropdown";
import { CustomSwitch } from "./custom-switch";
import { SearchButton } from "./search-button";
import { SearchTrigger } from "./search-trigger";

export function SearchMenu() {
  const [type, setType] = useState<"city" | "country">("country");
  const { searchedTerm, setSearchedTerm } = useSearchContext();
  const [mode, setMode] = useState("");

  const switchOpts = ["City", "Country"];
  // TODO: Get valid options from API and cache them
  let dropdownOpts = {
    city: [
      {label: "Commuter train", value: "commuter_train"},
      {label: "Metro", value: "metro"},
      {label: "Tram", value: "tram"},
      {label: "Bus", value: "bus"},
      
    ],
    country: [
      {label: "High-Speed train", value: "high_speed_rail"},
      {label: "Intercity train", value: "intercity_rail"},
      {label: "Intercity Bus", value: "bus"},
    ]
  } ;

  function onSwitchChange(index: number) {
    if (index === 0) {
      setType("city");
    } else {
      setType("country");
    }
  }

  function onDropdownChange(selectedIndex: number) {
    setMode(dropdownOpts[type][selectedIndex].value);
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
      data={type === "city" ? dropdownOpts.city : dropdownOpts.country}
        labelField={"label"}
        valueField={"value"}
        onChange={(item) => {}}
      />
      <SearchButton/>
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
  }
});
