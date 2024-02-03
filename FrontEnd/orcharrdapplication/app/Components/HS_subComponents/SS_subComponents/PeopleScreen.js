import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
//import { Swipeable } from "react-native-gesture-handler";
import { SwipeListView } from "react-native-swipe-list-view";
import { connect } from "react-redux";
const api = "http://127.0.0.1:34000";
const PeopleScreen = (props) => {
  const { GlobalUsername, GlobalPlace } = props;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchData = async () => {
      const response = await fetch(
        `${api}/get_profiles/${GlobalPlace}/${GlobalUsername}`
      );
      const data = await response.json();

      //console.log(data.group);
      setUsers(data.group);
      console.log("users", users);
    };

    fetchData();
  }, []);

  const swipeRow = (username, location) => {
    // Send the swiped user's data to the backend
    fetch(`${api}/add_swiped_user/${place}/${GlobalUsername}/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
      <Text>{item.username}</Text>
      {/* <Swipeable
        renderRightActions={(_, rowMap) => renderHiddenItem(item, rowMap)}
        onSwipeableRightOpen={() => swipeRow(item.username, item.location)}
      >
        <View style={styles.hiddenItem}>
          <Text>Chuck</Text>
        </View>
      </Swipeable> */}
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <TouchableOpacity
      style={styles.hiddenItem}
      onPress={() => swipeRow(data.item.username, data.item.location)}
    >
      <Text>Chuck</Text>
      {/* <Text style={styles.swipeText}>YES</Text> */}
    </TouchableOpacity>
  );

  return (
    // <SwipeListView
    //   data={users}
    //   renderItem={renderItem}
    //   renderHiddenItem={renderHiddenItem}
    //   leftOpenValue={75}
    //   rightOpenValue={-75}
    //   disableRightSwipe
    //   previewRowKey={"0"}
    //   previewOpenValue={-40}
    //   previewOpenDelay={3000}
    // />
    <View>
      <Text> HEllo</Text>
    </View>
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
  GlobalPlace: state.GlobalPlace,
});

export default connect(mapStateToProps)(PeopleScreen);
