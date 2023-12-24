import React, { useState } from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Card from "./Cards";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F8FF",
  },
});
export default PlaceScreen;
