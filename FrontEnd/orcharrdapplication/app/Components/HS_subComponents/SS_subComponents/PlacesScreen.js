import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  useLocalSearchParams,
} from "react-native";

import { connect } from "react-redux";
import { useRouter } from "expo-router";

const PlacesScreen = (props) => {
  const router = useRouter();

  const { setGlobalPlace } = props;
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
  // const selectPlace = (name) => {
  //   //router.setParams({ place: name });
  //   router.push(`Components/HS_subComponents/SS_subComponents/PeopleScreen/`);
  // };
  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setGlobalPlace(item.place);
                router.push(
                  `Components/HS_subComponents/SS_subComponents/PeopleScreen`
                );
              }}
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
    backgroundColor: "#FFF",
  },
  card: {
    backgroundColor: "#82cf97",
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

const mapDispatchToProps = (dispatch) => {
  return {
    setGlobalPlace: (globalPlace) =>
      dispatch({ type: "SET_GLOBAL_PLACE", globalPlace }),
  };
};

export default connect(null, mapDispatchToProps)(PlacesScreen);
