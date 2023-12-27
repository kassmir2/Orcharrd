import React, { useState } from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LS_subComponents/LoginScreen";
import ChoiceScreen from "./LS_subComponents/ChoiceScreen";
import CreateAccScreen from "./LS_subComponents/CreateAccScreen";
const Stack = createNativeStackNavigator();
const StartScreen = (route) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChoiceScreen"
        component={ChoiceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccScreen"
        component={CreateAccScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StartScreen;
