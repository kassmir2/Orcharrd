import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Card from "./Cards";

const PlaceScreen = () => {
  const navigation = useNavigation();
  const places = [
    {
      title: "Grab a Drink at Glass Thing",
      subtitle: "Downtown Durham's coolest new bar",
      numInterested: 15,
      place: "A Durham Bar",
    },
    {
      title: "Get Coffee at Foster Street Coffee",
      subtitle: "Warm drinks and yummy treats",
      numInterested: 12,
      place: "Foster Street Coffee",
    },
    {
      title: "Go on a walk down the American Tobacco Trail",
      subtitle: "Scenic routes and paved walkways",
      numInterested: 23,
      place: "a Tobacco Trail???",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("PeopleScreen", {place: item.place})}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              {item.numInterested && (
                <Text style={styles.numInterested}>
                  {item.numInterested} people interested
                </Text>
              )}
              <View style={styles.horizontalLine}></View>
            </TouchableOpacity>
          </View>
        )}
      />
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
  horizontalLine: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginTop: 10,
  },
});
export default PlaceScreen;

// onPress={() =>
//           navigation.navigate("PeopleScreen", { place: "a Tobacco Trail????" })
//         }
