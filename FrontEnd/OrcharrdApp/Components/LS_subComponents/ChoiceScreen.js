import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ChoiceScreen = () => {
  navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateAccScreen")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center content vertically
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around", // Evenly space buttons
    width: "70%", // Adjust width as needed
  },
  button: {
    backgroundColor: "#8FBC8F",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    marginBottom: 60,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
