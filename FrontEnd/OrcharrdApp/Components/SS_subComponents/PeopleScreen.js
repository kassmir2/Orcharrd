import React, { useState } from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const PeopleScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You selected {route.params.place}. </Text>
      <Text style={styles.subtitle}>This is where you'll swipe on people</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F8FF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  subtitle: {
    fontSize: 16,
    color: "black",
  },
});
export default PeopleScreen;
