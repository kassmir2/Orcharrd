import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { connect } from "react-redux";
import { useRouter } from "expo-router";
const api = process.env.EXPO_PUBLIC_BACKEND_URL;
const PlacesScreen = (props) => {
  const router = useRouter();
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const { setGlobalPlace, GlobalUsername } = props;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${api}/get_places/${GlobalUsername}`);
        const data = await response.json();
        // Use a temporary array to collect updated user profiles
        setPlaces(data["locations"]);
        console.log("fetched location data");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setHasError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        setIsSwiping(true);
      }
    };
    if (!isLoading && !isSwiping) {
      fetchData();
    }
  }, [api]);

  return (
    <View style={styles.container}>
      {places.length != 0 ? (
        <FlatList
          data={places}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  setGlobalPlace(item.name);
                  router.push(
                    `Components/HS_subComponents/SS_subComponents/PlaceInfoScreen`
                  );
                }}
              >
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.description}</Text>
                {item.group && (
                  <Text style={styles.numInterested}>
                    {item.group.length} people interested
                  </Text>
                )}
                <View style={styles.horizontalLine}></View>
                
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={{ backgroundColor: "black" }}> Loading </Text>
      )}
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
const mapStateToProps = (state) => ({
  GlobalUsername: state.GlobalUsername,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesScreen);
