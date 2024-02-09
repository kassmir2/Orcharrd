import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
const api = "http://192.168.16.187:34000";
const apiSchool = "http://10.195.11.92:34000";
const fetchImageData = async (username, pic, setPic) => {
  console.log("fetchImageData");
  try {
    const response = await fetch(`${apiSchool}/get_image/${pic}/${username}`);

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
const SwipeCard = ({ profile, profileNext, onSwipe }) => {
  const [userOnePicOne, setUserOnePicOne] = useState([]);
  const [userOnePicTwo, setUserOnePicTwo] = useState([]);
  const [userOnePicThree, setUserOnePicThree] = useState([]);
  const [userOnePicFour, setUserOnePicFour] = useState([]);
  const [userTwoPicOne, setUserTwoPicOne] = useState([]);
  const [userTwoPicTwo, setUserTwoPicTwo] = useState([]);
  const [userTwoPicThree, setUserTwoPicThree] = useState([]);
  const [userTwoPicFour, setUserTwoPicFour] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesUserTwo, setImagesUserTwo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    fetchImageData(profile.username, "picOne", setUserOnePicOne);
    fetchImageData(profile.username, "picTwo", setUserOnePicTwo);
    fetchImageData(profile.username, "picThree", setUserOnePicThree);
    fetchImageData(profile.username, "picFour", setUserOnePicFour);
  }, [profile]);
  useEffect(() => {
    const difImages = [];
    difImages.push(userOnePicOne);
    difImages.push(userOnePicTwo);
    difImages.push(userOnePicThree);
    difImages.push(userOnePicFour);
    setImages(difImages);
  }, [userOnePicOne, userOnePicTwo, userOnePicThree, userOnePicFour]);

  const [translateX] = useState(new Animated.Value(0));

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => setIsSwiping(true),
      onPanResponderMove: (event, gesture) => {
        translateX.setValue(gesture.dx);
      },
      onPanResponderRelease: (event, gesture) => {
        const { dx } = gesture;
        const screenWidth = Dimensions.get("window").width;
        const swipeThreshold = screenWidth / 3;

        if (dx > swipeThreshold) {
          setImages([]);
          setCurrentIndex(0);

          onSwipe(profile, "right");

          Animated.timing(translateX, {
            toValue: screenWidth,
            duration: 200,
            useNativeDriver: true,
          }).start(() => translateX.setValue(0));
        } else if (dx < -swipeThreshold) {
          onSwipe(profile, "left");
          Animated.timing(translateX, {
            toValue: -screenWidth,
            duration: 200,
            useNativeDriver: true,
          }).start(() => translateX.setValue(0));
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }

        setIsSwiping(false);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, { transform: [{ translateX }] }]}
      >
        <View style={styles.profileNameContainer}>
          <Text style={styles.profileName}>{profile.name}</Text>
        </View>

        <Image
          source={{ uri: `data:image/jpeg;base64,${images[currentIndex]}` }}
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            height: "90%",
            width: "60%",
            right: 0,
            top: 0,
            bottom: 0,
            left: 210,
            elevation: 6,
          }}
          onPress={nextImage}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            height: "90%",
            width: "50%",
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            elevation: 6,
          }}
          onPress={prevImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileBio}>{profile.bio}</Text>
        </View>
      </Animated.View>
    </View>
  );
};
export default SwipeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "108%",
    height: "102%",
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "95%",
    height: "60%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  profileInfo: {
    position: "absolute",
    bottom: 20,
    padding: 20,
  },
  profileNameContainer: {
    position: "absolute",
    top: 20,
    padding: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileBio: {
    fontSize: 16,
    color: "#666",
  },
});
