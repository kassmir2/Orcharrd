import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./Components/store.js";
import StartScreen from "./Components/StartScreen.js";

const MyApp = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StartScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default MyApp;
