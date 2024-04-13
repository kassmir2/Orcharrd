import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropdownComponent = ({
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
      <Dropdown
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
          setValue(item.value);
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
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
