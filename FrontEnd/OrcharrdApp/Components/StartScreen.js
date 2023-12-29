import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LS_subComponents/LoginScreen";
import ChoiceScreen from "./LS_subComponents/ChoiceScreen";
import CreateAccScreen from "./LS_subComponents/CreateAccScreen";
import Home from "./Home";
import { connect } from "react-redux";

const Stack = createNativeStackNavigator();
const StartScreen = (props) => {
  const { IsLoggedIn } = props;
  return (
    <Stack.Navigator>
      {IsLoggedIn ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="ChoiceScreen"
            component={ChoiceScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateAccScreen"
            component={CreateAccScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      )
      }
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  IsLoggedIn: state.IsLoggedIn,
});

export default connect(mapStateToProps)(StartScreen);
