import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./Components/Tabs.js";
import { Provider } from "react-redux";
import store from "./Components/store.js";

const MyApp = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
};

export default MyApp;
