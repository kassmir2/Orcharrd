import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

const api = "http://127.0.0.1:34000";
const ProfileScreen = () => {
  const [picOne, setPicOne] = useState([]);
  const [picTwo, setPicTwo] = useState([]);
  const [picThree, setPicThree] = useState([]);
  const [picFour, setPicFour] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  // Function to fetch image data from the backend
  const fetchImageData = async (setPic, pic) => {
    try {
      const username = "peter"; // Replace with the actual username
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
  const fetchUserInfo = async () => {
    try {
      const username = "peter"; // Replace with the actual username
      const response = await fetch(`${api}/get_user_info/${username}`);

      if (!response.ok) {
        console.error("Error fetching user information:", response.statusText);
        return;
      }

      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  // Fetch image data when the component mounts
  useEffect(() => {
    fetchImageData(setPicOne, "picOne");
    fetchImageData(setPicTwo, "picTwo");
    fetchImageData(setPicThree, "picThree");
    fetchImageData(setPicFour, "picFour");
    fetchUserInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Text>Name: {userInfo.name}</Text>
          <Text>Bio: {userInfo.bio}</Text>
        </View>
      )}
      {picOne && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${picOne}` }}
            style={styles.image}
          />
        </View>
      )}
      {picTwo && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${picTwo}` }}
            style={styles.image}
          />
        </View>
      )}
      {picThree && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${picThree}` }}
            style={styles.image}
          />
        </View>
      )}
      {picFour && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${picFour}` }}
            style={styles.image}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default ProfileScreen;
