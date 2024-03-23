import React, { useState } from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="MatchesScreen" options={{ headerShown: false }} />

      <Stack.Screen name="ChatScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
