import React, { useState } from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

const styles = StyleSheet.create({
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
    marginVertical: 10,
  },
});

export default Card;
