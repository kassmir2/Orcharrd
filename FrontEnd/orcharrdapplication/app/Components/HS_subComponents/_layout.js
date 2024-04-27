import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Tabs } from "expo-router/tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";


const api = process.env.EXPO_PUBLIC_BACKEND_URL;
function Normal(props) {
  const { GlobalUsername } = props;
  const [name, setName] = useState("");



const fetchName = async () => {
  try {
    const response = await fetch(`${api}/get_name/${GlobalUsername}`);

    if (!response.ok) {
      console.error("Error fetching name:", response.statusText);
      return;
    }

    const data = await response.json();
    setName(data.name);
  } catch (error) {
    console.error("Error fetching name:", error);
  }
};
useEffect(() => {
  fetchName();
}, []);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitle: () => (
          <View style={styles.headerContainer}>
            {route.name === "SS_subComponents" && (
              <>
                <Image
                  source={require("../../../assets/Orcharrd_Logo.png")}
                  style={{ width: "30%", height: "180%", marginLeft: 5 }}
                  resizeMode="stretch"
                />
                <Text
                  style={{
                    marginLeft: 10,
                    color: "darkgreen",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Swipe
                </Text>
              </>
            )}
            {route.name === "CS_subComponents" && (
              <>
                <Image
                  source={require("../../../assets/Orcharrd_Logo.png")}
                  style={{ width: "30%", height: "180%", marginLeft: 5 }}
                  resizeMode="stretch"
                />
                <Text
                  style={{
                    marginLeft: 10,
                    color: "darkgreen",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Matches
                </Text>
              </>
            )}
            {route.name === "ProfileScreen" && (
              <>
                <Image
                  source={require("../../../assets/Orcharrd_Logo.png")}
                  style={{ width: "30%", height: "180%", marginLeft: 5 }}
                  resizeMode="stretch"
                />
                <Text
                  style={{
                    marginLeft: 10,
                    color: "darkgreen",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  {name}
                </Text>
              </>
            )}
          </View>
        ),
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tabs.Screen
        name="SS_subComponents"
        options={{
          tabBarLabel: "Swipe",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: undefined,
        }}
      />
      <Tabs.Screen
        name="CS_subComponents"
        options={{
          tabBarLabel: "Matches",
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubbles" color={color} size={size} />
          ),
          headerShown: undefined,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
          headerShown: undefined,
        }}
      />
    </Tabs>
  );
}

const mapStateToProps = (state) => ({
  GlobalUsername: state.GlobalUsername,
});

export default connect(mapStateToProps)(Normal);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
