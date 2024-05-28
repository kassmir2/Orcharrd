import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const ChoiceScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Orcharrd_Logo.png")}
        style={{ width: 260, height: 170, marginBottom: 50 }}
        resizeMode="stretch"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("Components/LS_subComponents/LoginScreen")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push("Components/LS_subComponents/CreateAccScreen")
          }
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
    justifyContent: "center",
    backgroundColor: "#FFFFFFFF",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around", // Evenly space buttons
    width: "70%", // Adjust width as needed
  },
  button: {
    backgroundColor: "#82cf97",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
