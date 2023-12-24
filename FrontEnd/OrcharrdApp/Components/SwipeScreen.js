import React, { useState } from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceScreen from "./SS_subCompenents/PlaceScreen";
import PeopleScreen from "./SS_subCompenents/PeopleScreen";

const Stack = createNativeStackNavigator();
const SwipeScreen = (route) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlaceScreen"
        component={PlaceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PeopleScreen"
        component={PeopleScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SwipeScreen;
