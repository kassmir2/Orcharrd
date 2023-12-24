import React, { useState } from "react";

import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const SwipeScreen = () => {
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
export default SwipeScreen;
