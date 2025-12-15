import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
  //this tell Expo router that all screens in the app should live inside this stack
  <Stack> 

    {/**it loads everything inside the (tabs) which is app/(tabs)/_layout.tsx  group as one screen
     * in the stack
     * 
     * the headerShown: header disables the Stack's header
     * because 1. tabs already have their own headers 2. showing another header would cause double headers
     * 
     * Parentheses mean: Route group (not part of the URL)
    */}
    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
  </Stack>
  );
}
