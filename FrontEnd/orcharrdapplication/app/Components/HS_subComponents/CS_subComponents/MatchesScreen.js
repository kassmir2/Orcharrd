import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import { useRouter } from "expo-router";
const api = process.env.EXPO_PUBLIC_BACKEND_URL;

const MatchesScreen = (props) => {
  const { GlobalUsername } = props;
  const router = useRouter();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching profiles");
      setIsLoading(true);
      try {
        const response = await fetch(`${api}/get_matches/${GlobalUsername}`);
        if (response.status == 201) {
          console.log("no matches found");
          return;
        }
        const data = await response.json();

        setMatches(data.matches);
        console.log("fetched User Data");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [api, GlobalUsername]);

  useEffect(() => {
    const fetchImages = async () => {
      console.log("fetching matches pictures");
      setIsLoading(true);
      const updatedMatches = [];
      for (let i = 0; i < matches.length; i++) {
        try {
          const response = await fetch(`${api}/get_image/picOne/${matches[i].username}`);
          const responseLoc = await fetch(`${api}/get_image_loc/picOne/${matches[i].location}`);
          if (!response.ok) {
            console.error("Error fetching user image data:", response.statusText);
            return;
          }
          if (!responseLoc.ok) {
            console.error("Error fetching location image data:", responseLoc.statusText);
            return;
          }
  
          const data = await response.blob();
          const reader = new FileReader();
  
          reader.onloadend = () => {
            const base64data = reader.result.split(",")[1];
            updatedMatches.push({ ...matches[i], userImage: base64data });
          };
  
          reader.readAsDataURL(data);

          // const dataLoc = await responseLoc.blob();
          // const readerLoc = new FileReader();
  
          // readerLoc.onloadend = () => {
          //   const base64dataLoc = readerLoc.result.split(",")[1];
          //   updatedMatches.push({ ...matches[i], locImage: base64dataLoc });
          // };
  
          // readerLoc.readAsDataURL(dataLoc);
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
      }
      setMatches(updatedMatches);
      setIsLoading(false);
    };
      fetchImages();
    
  }, []);

  return (
    <View style={styles.container}>
      {matches.length !== 0 ? (
        <FlatList
          data={matches}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  router.push(
                    `Components/HS_subComponents/CS_subComponents/ChatScreen`
                  );
                }}
              >
                <Text style={styles.title}>{item.username}</Text>
                <Text style={styles.subtitle}>{item.location}</Text>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${item.userImage}` }}
                    style={styles.image}
                  />
                </View>
                {/* <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${item.locImage}` }}
                    style={styles.image}
                  />
                </View> */}
                <View style={styles.horizontalLine}></View>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noMatchesText}>No Matches Found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  card: {
    backgroundColor: "#82cf97",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 16,
    color: "black",
  },
  numInterested: {
    fontSize: 12,
    color: "black",
  },
  horizontalLine: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginTop: 10,
  },
  noMatchesText: {
    fontSize: 18,
    color: "#000000", // Black text
    textAlign: "center",
    marginTop: 20,
  },
  imageContainer: {
    marginBottom: 0,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 70,
    resizeMode: "cover",
    marginBottom: 2,
  },
});

const mapStateToProps = (state) => ({
  GlobalUsername: state.GlobalUsername,
});

export default connect(mapStateToProps)(MatchesScreen);
