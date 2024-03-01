import React, { useState } from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="PlacesScreen" options={{ headerShown: false }} />
      <Stack.Screen name="PlaceInfoScreen" options={{ headerShown: false }} />
      <Stack.Screen name="PeopleScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
