import React, { useState } from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

const Card = ({ title, subtitle, numInterested, onPress }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {numInterested && (
          <Text style={styles.numInterested}>
            {numInterested} people interested
          </Text>
        )}
        <View style={styles.horizontalLine}></View>
      </TouchableOpacity>
    </View>
  );
};

const PlaceScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Card
        title="Grab a Drink at Glass Thing"
        subtitle="Downtown Durham's coolest new bar"
        numInterested={15}
        onPress={() =>
          navigation.navigate("PeopleScreen", { place: "A Durham Bar" })
        }
      />
      <Card
        title="Get Coffee at Foster Street Coffee"
        subtitle="Warm drinks and yummy treats"
        numInterested={12}
        onPress={() =>
          navigation.navigate("PeopleScreen", { place: "Foster Street Coffee" })
        }
      />
      <Card
        title="Go on a walk down the American Tobacco Trail"
        subtitle="Scenic routes and paved walkways"
        numInterested={23}
        onPress={() =>
          navigation.navigate("PeopleScreen", { place: "a Tobacco Trail????" })
        }
      />
    </View>
  );
};

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
  card: {
    backgroundColor: "#8FBC8F",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
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
  numInterested: {
    fontSize: 12,
    color: "black",
  },
  button: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    borderRadius: 1,
    marginTop: 1,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  horizontalLine: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
export default SwipeScreen;
