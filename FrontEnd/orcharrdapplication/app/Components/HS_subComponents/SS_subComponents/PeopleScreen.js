import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
const api = process.env.EXPO_PUBLIC_BACKEND_URL;
import SwipeCard from "./Cards";
const PeopleScreen = (props) => {
  const { GlobalUsername, GlobalPlace } = props;

  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching profiles");
      setIsLoading(true);
      try {
        const response = await fetch(
          `${api}/get_profiles/${GlobalPlace}/${GlobalUsername}`
        );
        const data = await response.json();
        // Use a temporary array to collect updated user profiles
        setUsers(data.userProfiles);
        console.log("fetched User Data");
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
    } else if (!isLoading) {
    }
  }, [api, GlobalPlace, GlobalUsername]);

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleSwipe = async (username, direction) => {
    console.log("swiped", direction, "on", username);
    if (direction == "right") {
      const response = await fetch(
        `${api}/addSwipedUser/${GlobalUsername}/${username}/${GlobalPlace}`,
        {
          method: "POST",
        }
      );
      //if it is not a match
      if (response.status == 201) {
        // If response status code is 200-299
        // Successful login
        console.log("success but no match");
        //is a match
      } else if (response.status == 200) {
        console.log("MATCH!");
      } else if (response.status == 500) {
        console.log("there was an error");
      }
    }
    setCurrentProfileIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <View style={styles.container}>
      {isLoading && users.length == 0 ? (
        <Text>Loading</Text>
      ) : (
        <>
          {users.length > 0 ? (
            <SwipeCard
              profile={users[currentProfileIndex]}
              profileNext={users[currentProfileIndex + 1]}
              onSwipe={handleSwipe}
            />
          ) : (
            <Text>No profiles found</Text>
          )}
        </>
      )}
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
