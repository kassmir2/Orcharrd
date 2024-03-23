import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
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
});

const mapStateToProps = (state) => ({
  GlobalUsername: state.GlobalUsername,
});

export default connect(mapStateToProps)(MatchesScreen);
