import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./Components/Tabs.js";

const MyApp = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default MyApp;
