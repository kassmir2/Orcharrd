import React, { useState } from "react";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "tomato", // Active icon color
        inactiveTintColor: "gray", // Inactive icon color
        style: {
          backgroundColor: "#f5f5f5", // Background color
          paddingVertical: 10, // Adjust vertical padding
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubbles" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
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

const MyApp = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
        <Tab.Screen name="ChatScreen" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

//COMPONENTS
const Card = ({ title, subtitle, numInterested }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {numInterested && (
        <Text style={styles.numInterested}>
          {numInterested} people interested
        </Text>
      )}
      <View style={styles.horizontalLine}></View>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Card
        title="Grab a Drink at Glass Meredith"
        subtitle="Downtown Durham's coolest new bar"
        numInterested={15}
      />
      <Card
        title="Get Coffee at Foster Street Coffee"
        subtitle="Warm drinks and yummy treats"
        numInterested={12}
      />
      <Card
        title="Go on a walk down the American Tobacco Trail"
        subtitle="Scenic routes and paved walkways"
        numInterested={23}
      />
    </View>
  );
};
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        This is where users will see their own profile and be able to edit it
      </Text>
    </View>
  );
};
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

// const SwipePage = ({ navigation, route }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.subtitle}> you selected {route.params.place}. </Text>
//       <Text style={styles.title}> This is the swiping page </Text>
//     </View>
//   );
// };

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

export default MyApp;
