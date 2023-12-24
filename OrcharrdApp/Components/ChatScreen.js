import React, { useState } from "react";

import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        This is where users will be able to see all their matches and chat with
        them
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: "black", // Change color as needed
    borderBottomWidth: 1, // Change thickness as needed
    marginVertical: 10, // Adjust spacing as needed
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  numInterested: {
    fontSize: 12,
    color: "#999",
  },
});
export default ChatScreen;
