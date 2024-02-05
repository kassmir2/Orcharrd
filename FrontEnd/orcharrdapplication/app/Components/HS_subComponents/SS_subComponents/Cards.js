import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from "react-native";

const SwipeCard = ({ profile, onSwipe }) => {
  const [translateX] = useState(new Animated.Value(0));
  const [isSwiping, setIsSwiping] = useState(false);
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
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.card, { transform: [{ translateX }] }]} // Use translateX directly
    >
      {/* <Image
        source={{ uri: `data:image/jpeg;base64,${profile.picOne}` }}
        style={styles.profileImage}
      /> */}
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileBio}>{profile.bio}</Text>
      </View>
    </Animated.View>
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
    position: "absolute",
    width: "80%",
    height: "60%",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "100%",
    height: "60%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  profileInfo: {
    position: "absolute",
    bottom: 20,
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
