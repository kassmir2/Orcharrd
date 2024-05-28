import React from "react";
import { Provider } from "react-redux";
import store from "./Components/store.js";
import { Stack } from "expo-router";
import { AuthProvider } from '../hooks/useAuth';

const _layout = () => {
  return (
    <Provider store={store}>
      <AuthProvider >
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
      </AuthProvider>
      
    </Provider>
  );
};

export default _layout;
