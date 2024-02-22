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
const api = process.env.EXPO_PUBLIC_BACKEND_URL;
var wait = (ms) => {
  const start = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
};
const fetchImageData = async (username, pic, setPic) => {
  try {
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
const SwipeCard = ({ profile, profileNext, onSwipe }) => {
  const [swipeCount, setSwipeCount] = useState(0);
  const [firstSwipe, setFirstSwipe] = useState(true);
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
  const [isSwiping, setIsSwiping] = useState(false);

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
    if (firstSwipe) {
      fetchImageData(profile.username, "picOne", setUserOnePicOne);
      fetchImageData(profile.username, "picTwo", setUserOnePicTwo);
      fetchImageData(profile.username, "picThree", setUserOnePicThree);
      fetchImageData(profile.username, "picFour", setUserOnePicFour);
      fetchImageData(profileNext.username, "picOne", setUserTwoPicOne);
      fetchImageData(profileNext.username, "picTwo", setUserTwoPicTwo);
      fetchImageData(profileNext.username, "picThree", setUserTwoPicThree);
      fetchImageData(profileNext.username, "picFour", setUserTwoPicFour);
    } else if (swipeCount % 2 == 1) {
      fetchImageData(profileNext.username, "picOne", setUserOnePicOne);
      fetchImageData(profileNext.username, "picTwo", setUserOnePicTwo);
      fetchImageData(profileNext.username, "picThree", setUserOnePicThree);
      fetchImageData(profileNext.username, "picFour", setUserOnePicFour);
    } else {
      fetchImageData(profileNext.username, "picOne", setUserTwoPicOne);
      fetchImageData(profileNext.username, "picTwo", setUserTwoPicTwo);
      fetchImageData(profileNext.username, "picThree", setUserTwoPicThree);
      fetchImageData(profileNext.username, "picFour", setUserTwoPicFour);
    }
  }, [profile]);
  useEffect(() => {
    const difImages = [];
    difImages.push(userOnePicOne);
    difImages.push(userOnePicTwo);
    difImages.push(userOnePicThree);
    difImages.push(userOnePicFour);
    setImages(difImages);
  }, [userOnePicOne, userOnePicTwo, userOnePicThree, userOnePicFour]);
  useEffect(() => {
    const difImagesTwo = [];
    difImagesTwo.push(userTwoPicOne);
    difImagesTwo.push(userTwoPicTwo);
    difImagesTwo.push(userTwoPicThree);
    difImagesTwo.push(userTwoPicFour);
    setImagesUserTwo(difImagesTwo);
  }, [userTwoPicOne, userTwoPicTwo, userTwoPicThree, userTwoPicFour]);

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
          setFirstSwipe(false);
          setSwipeCount((prevIndex) => prevIndex + 1);

          setCurrentIndex(0);
          onSwipe(profile, "right");

          Animated.timing(translateX, {
            toValue: screenWidth,
            duration: 200,
            useNativeDriver: true,
          }).start(() => translateX.setValue(0));
        } else if (dx < -swipeThreshold) {
          setFirstSwipe(false);
          setSwipeCount((prevIndex) => prevIndex + 1);

          setCurrentIndex(0);
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
        {swipeCount % 2 == 0 ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${images[currentIndex]}` }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={{
              uri: `data:image/jpeg;base64,${imagesUserTwo[currentIndex]}`,
            }}
            style={styles.profileImage}
          />
        )}
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
            zIndex: 2,
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
            zIndex: 2,
          }}
          onPress={prevImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileBio}>{profile.bio}</Text>
        </View>
      </Animated.View>

      <View style={styles.backCard}>
        <View style={styles.profileNameContainer}>
          <Text style={styles.backName}>{profileNext.name} back</Text>
          {swipeCount % 2 == 0 ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${userTwoPicOne}` }}
              style={styles.backImage}
            />
          ) : (
            <Image
              source={{ uri: `data:image/jpeg;base64,${userOnePicOne}` }}
              style={styles.backImage}
            />
          )}
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileBio}>{profileNext.bio}</Text>
        </View>
      </View>
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
    zIndex: 1,
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
    position: "absolute",
  },
  backCard: {
    zIndex: 0,
    width: "108%",
    height: "102%",
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 400,
    height: 600,
    resizeMode: "cover",
    borderRadius: 10,
  },
  backImage: {
    resizeMode: "cover",
    borderRadius: 10,
    width: 400,
    height: 600,
  },
  profileInfo: {
    position: "absolute",
    bottom: 1,
    padding: 20,
  },
  profileNameContainer: {
    position: "absolute",
    top: 10,
    padding: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  backName: {
    fontSize: 20,
    left: 150,
    fontWeight: "bold",
  },
  profileBio: {
    fontSize: 16,
    color: "#666",
  },
});
