import React, { useState } from "react";

import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        This is where users will see their own profile and be able to edit it
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
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
export default ProfileScreen;
