import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import SwipeListView from "react-native-swipe-list-view";

const api = "http://127.0.0.1:34000";
const PeopleScreen = ({ route, props }) => {
  const { GlobalUsername } = props;
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Fetch user data from the backend
    const fetchData = async () => {
      const response = await fetch(`${api}/get_profiles/${route.params.place}`);
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, []);

  const swipeRow = (username, location) => {
    // Send the swiped user's data to the backend
    fetch(
      `${api}/add_swiped_user/${route.params.place}/${GlobalUsername}/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Alert.alert("Success", "You swiped successfully!");
        } else {
          Alert.alert("Error", data.message);
        }
      })
      .catch((error) => {
        Alert.alert("Error", "Something went wrong. Please try again.");
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.profilePicture }} style={styles.image} />
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <TouchableOpacity
      style={styles.hiddenItem}
      onPress={() => swipeRow(data.item.username, data.item.location)}
    >
      <Text style={styles.swipeText}>YES</Text>
    </TouchableOpacity>
  );

  return (
    <SwipeListView
      data={users}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
      disableRightSwipe
      previewRowKey={"0"}
      previewOpenValue={-40}
      previewOpenDelay={3000}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F8FF",
  },
  item: {
    backgroundColor: "white",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  location: {
    fontSize: 16,
    color: "gray",
  },
  hiddenItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  swipeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

const mapStateToProps = (state) => ({
  GlobalUsername: state.GlobalUsername,
});

export default connect(mapStateToProps)(PeopleScreen);
