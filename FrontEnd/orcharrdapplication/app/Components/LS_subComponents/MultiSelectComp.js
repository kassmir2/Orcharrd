import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const MultiSelectComponent = ({
  Data,
  setValue,
  value,
  labIconDes,
  PHtext,
  labelText,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#82cf97" }]}>
          {labelText}
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <MultiSelect
        style={[styles.dropdown, isFocus && { borderColor: "#82cf97" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={Data}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `${PHtext}` : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "#82cf97" : "black"}
            name={labIconDes}
            size={20}
          />
        )}
        selectedStyle={styles.selectedStyle}
        activeColor="#82cf97"
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: "#82cf97",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
