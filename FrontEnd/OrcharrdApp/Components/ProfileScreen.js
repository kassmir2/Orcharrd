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
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default ProfileScreen;
