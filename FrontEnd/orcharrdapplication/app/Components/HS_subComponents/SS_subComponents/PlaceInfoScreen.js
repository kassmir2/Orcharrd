import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
const api = process.env.EXPO_PUBLIC_BACKEND_URL;
import { connect } from "react-redux";

const PlaceInfoScreen = (props) => {
  const { GlobalPlace } = props;
  const [picOne, setPicOne] = useState([]);
  const [picTwo, setPicTwo] = useState([]);
  const [picThree, setPicThree] = useState([]);
  const [picFour, setPicFour] = useState([]);
  const [locInfo, setLocInfo] = useState(null);
  // Function to fetch image data from the backend
  const fetchImageData = async (setPic, pic) => {
    try {
      const response = await fetch(
        `${api}/get_image_loc/${pic}/${GlobalPlace}`
      );

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
  const fetchLocInfo = async () => {
    try {
      const response = await fetch(`${api}/get_place_info/${GlobalPlace}`);

      if (!response.ok) {
        console.error("Error fetching user information:", response.statusText);
        return;
      }

      const data = await response.json();
      setLocInfo(data);
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
    fetchLocInfo();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {locInfo && (
          <View>
            <Text style={styles.title}>Name: {locInfo["name"]}</Text>
            <Text style={styles.subtitle}>
              Description: {locInfo["description"]}
            </Text>
            <Text style={styles.subtitle}>Category: {locInfo["category"]}</Text>
            <Text style={styles.subtitle}>Address: {locInfo["address"]}</Text>
            <Text style={styles.subtitle}>Price: {locInfo["price"]}</Text>

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
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.selectLocationButton}
        onPress={() => {
          router.push(
            `Components/HS_subComponents/SS_subComponents/PeopleScreen`
          );
        }}
      >
        <Text style={styles.selectLocationText}>Select Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  selectLocationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#82cf97",
    borderRadius: 8,
    padding: 15,
  },
  selectLocationText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "black",
    marginBottom: 5,
    textAlign: "center",
  },
  numInterested: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
  },
  horizontalLine: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: "cover",
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
    //width: "50%",
    //justifyContent: "center",
    //width: 200,
  },
});

const mapStateToProps = (state) => ({
  GlobalPlace: state.GlobalPlace,
});

export default connect(mapStateToProps)(PlaceInfoScreen);
