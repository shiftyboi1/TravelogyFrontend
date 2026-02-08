import { ThemedSvg } from "@/components/themed-svg";
import { ThemedView } from "@/components/themed-view";
import { FontSizes } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ChevronsRightIcon } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export type CustomDropdownProps = DropdownProps<any> & {
  callback: (selectedValue: number) => void;
}

export function CustomDropdown({
  callback,data,
  labelField, valueField, onChange, ...props }: CustomDropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const highlightColor = useThemeColor({}, "secondary");
  const subtleHighlightColor = `${highlightColor}20`; // 12.5% opacity

  const placeholderText = (data && data.length > 0) ? "How are you going?" : "No internet connection.";

  return (
    <ThemedView style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholderText}
        renderLeftIcon={() => (
          <ThemedSvg
            icon={ChevronsRightIcon}
            size={24}
            style={styles.icon}
          />
        )}
        itemTextStyle={[styles.itemText, { color }]}
        containerStyle={[styles.itemsContainer, { backgroundColor }]}
        itemContainerStyle={[styles.itemContainer]}
        activeColor={subtleHighlightColor}
        selectedTextStyle={[styles.fieldText, { color }]}
        placeholderStyle={[styles.fieldText, styles.placeholderText, { color }]}
        onChange={(item) => {
          setSelectedIndex(data.indexOf(item));
          callback(data.indexOf(item));
        }}
        {...props}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 0,
    height: 60,
    marginBottom: 16,
    justifyContent: "center",
  },
  dropdown: {
    height: 60,
  },
  itemsContainer: {
    paddingVertical: 16,
    borderRadius: 16,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 5,
  },
  itemContainer: {
    borderRadius: 16,
  },
  itemText: {
    fontSize: FontSizes.menu,
  },
  fieldText: {
    fontSize: FontSizes.menu,
    height: 60,
    textAlignVertical: "center",
  },
  placeholderText: {
    opacity: 0.5
  },
  icon: {
    marginRight: 16,
  },
});