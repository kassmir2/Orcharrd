import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import SwipeScreen from "./SwipeScreen.js";
import ProfileScreen from "./ProfileScreen.js";
import ChatScreen from "./ChatScreen.js";
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: (props) => (
          <View style={styles.headerContainer}>
            <Image
              source={require("../assets/Orcharrd_Logo.png")}
              style={{ width: 60, height: 40, marginLeft: 5 }}
            />
            <Text
              style={{
                marginLeft: 10,
                color: "darkgreen",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              {route.name}
            </Text>
          </View>
        ),
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tab.Screen
        name="Swipe"
        component={SwipeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubbles" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
