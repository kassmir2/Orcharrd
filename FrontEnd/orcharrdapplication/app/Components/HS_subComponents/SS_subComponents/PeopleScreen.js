import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
//import { Swipeable } from "react-native-gesture-handler";
import { connect } from "react-redux";
const api = "http://192.168.16.187:34000";
import SwipeCard from "./Cards";
const PeopleScreen = (props) => {
  const { GlobalUsername, GlobalPlace } = props;

  const [users, setUsers] = useState([]);
  const [pic, setPic] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const fetchImageData = async (username) => {
    // console.log("fetchImageData");
    try {
      let pic = "picOne";
      const response = await fetch(`${api}/get_image/${pic}/${username}`);

      if (!response.ok) {
        console.error("Error fetching image data:", response.statusText);
        return;
      }

      const data = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1];
        setPic(base64data);
      };

      reader.readAsDataURL(data);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

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
        const updatedUserProfiles = [];

        for (const element of data.userProfiles) {
          const username = element.username;
          //await fetchImageData(username);
          // Update the user object with the 'picOne' key and image data
          const updatedUserProfile = {
            ...element,
            //picOne: pic,
          };
          updatedUserProfiles.push(updatedUserProfile);
          setUsers(updatedUserProfiles);
          console.log("did ", username);
        }
        console.log("updated length:", updatedUserProfiles.length);
        console.log(updatedUserProfiles[0]);

        // Update the state after the loop is complete
        setUsers(updatedUserProfiles);

        // console.log("users", updatedUserProfiles);
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
  }, [api, GlobalPlace, GlobalUsername]);

  const swipeRow = (username) => {
    // Send the swiped user's data to the backend
    console.log("swiped yes on ", username);
    // fetch(
    //   `${api}/add_swiped_user/${GlobalPlace}/${GlobalUsername}/${username}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.success) {
    //       Alert.alert("Success", "You swiped successfully!");
    //     } else {
    //       Alert.alert("Error", data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     Alert.alert("Error", "Something went wrong. Please try again.");
    //   });
  };

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleSwipe = (profile, direction) => {
    console.log("swiped Successfully");
    if (direction == "right") {
      swipeRow(profile.username);
    }
    // Call your swipeRow function
    if (currentProfileIndex == 3) {
      setIsSwiping(false);
      console.log("reloading data");
      setCurrentProfileIndex(0);
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
