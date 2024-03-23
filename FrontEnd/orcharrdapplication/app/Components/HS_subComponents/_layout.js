import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Tabs } from "expo-router/tabs";
import Icon from "react-native-vector-icons/Ionicons";

function Normal() {
  return (
    <Tabs
      screenOptions={() => ({
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Image
              source={require("../../../assets/Orcharrd_Logo.png")}
              style={{ width: 60, height: 40, marginLeft: 5 }}
              resizeMode="stretch"
            />
            <Text
              style={{
                marginLeft: 10,
                color: "darkgreen",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Where Pairs Go To Grow
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
      <Tabs.Screen
        name="SS_subComponents"
        options={{
          tabBarLabel: "Swipe",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: undefined,
        }}
      />
      <Tabs.Screen
        name="CS_subComponents"
        options={{
          tabBarLabel: "Matches",
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubbles" color={color} size={size} />
          ),
          headerShown: undefined,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
          headerShown: undefined,
        }}
      />
    </Tabs>
  );
}

export default Normal;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
