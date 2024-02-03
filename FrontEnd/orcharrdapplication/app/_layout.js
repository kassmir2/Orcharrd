import React from "react";
import { Provider } from "react-redux";
import store from "./Components/store.js";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="Components/LS_subComponents/LoginScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Components/LS_subComponents/CreateAccScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Components/HS_subComponents"
          options={{ headerShown: false }}
        />
      </Stack>
    </Provider>
  );
};

export default _layout;
