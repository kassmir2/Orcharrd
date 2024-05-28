import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Video } from "expo-av";

const api = process.env.EXPO_PUBLIC_BACKEND_URL;
const ProfileScreen = (props) => {
  const { GlobalUsername } = props;
  const [picOne, setPicOne] = useState([]);
  const [picTwo, setPicTwo] = useState([]);
  const [picThree, setPicThree] = useState([]);
  const [picFour, setPicFour] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  // Function to fetch image data from the backend
  const fetchImageData = async (setPic, pic) => {
    try {
      const response = await fetch(`${api}/get_image/${pic}/${GlobalUsername}`);

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
      const response = await fetch(`${api}/get_user_info/${GlobalUsername}`);

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
      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.bio}>Bio: {userInfo.bio}</Text>
        </View>
      )}
      <View style={styles.container}>
        {picOne.length !== 0 ? ( // Use curly braces here
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${picOne}` }}
              style={styles.image}
            />
          </View>
        ) : (
          <View style={styles.videoContainer}>
            <Video
              source={require("../../../assets/Orcharrd_Loading.mov")}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode="stretch"
              shouldPlay
              isLooping
              style={styles.video}
            />
          </View>
        )}
      </View>
      <View style={styles.container}>
        {picTwo.length !== 0 ? ( // Use curly braces here
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${picTwo}` }}
              style={styles.image}
            />
          </View>
        ) : (
          <View style={styles.videoContainer}>
            <Video
              source={require("../../../assets/Orcharrd_Loading.mov")}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode="stretch"
              shouldPlay
              isLooping
              style={styles.video}
            />
          </View>
        )}
      </View>

      <View style={styles.container}>
        {picThree.length !== 0 ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${picThree}` }}
              style={styles.image}
            />
          </View>
        ) : (
          <View style={styles.videoContainer}>
            <Video
              source={require("../../../assets/Orcharrd_Loading.mov")}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode="stretch"
              shouldPlay
              isLooping
              style={styles.video}
            />
          </View>
        )}
      </View>
      <View style={styles.container}>
        {picFour.length !== 0 ? ( // Use curly braces here
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${picFour}` }}
              style={styles.image}
            />
          </View>
        ) : (
          <View style={styles.videoContainer}>
            <Video
              source={require("../../../assets/Orcharrd_Loading.mov")}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode="stretch"
              shouldPlay
              isLooping
              style={styles.video}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
    //alignItems: "center",
  },
  userInfoContainer: {
    padding: 1,
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#82cf97",
  },
  bio: {
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: "cover",
    marginBottom: 10,
  },
  video: {
    width: 300,
    height: 400,
    resizeMode: "cover",
    marginBottom: 10,
  },
  videoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
});
const mapStateToProps = (state) => ({
  GlobalUsername: state.GlobalUsername,
});

export default connect(mapStateToProps)(ProfileScreen);
