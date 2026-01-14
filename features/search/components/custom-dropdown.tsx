import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export type CustomDropdownProps = DropdownProps<any> & {
  callback: (selectedValue: any) => void;  
}

export function CustomDropdown({
  callback,data,
  labelField, valueField, ...props }: CustomDropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  return (
    <ThemedView style={styles.container}>
      <Dropdown
        data={data}
        labelField={labelField}
        valueField={valueField}
        itemTextStyle={{ fontSize: 26 }}
        onChange={(item) => {
          setSelectedIndex(data.indexOf(item));
          callback(data.indexOf(item));
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 8,
    height: 70,
    justifyContent: "center",
  }
});