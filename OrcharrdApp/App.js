import React, { useState } from "react";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SwipeScreen from "./Components/SwipeScreen.js";
import ProfileScreen from "./Components/ProfileScreen.js";
import ChatScreen from "./Components/ChatScreen.js";
import MyTabs from "./Components/Tabs.js";

const MyApp = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default MyApp;
