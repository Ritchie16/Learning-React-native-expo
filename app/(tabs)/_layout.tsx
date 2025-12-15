import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    //This means that navigation is tab-based
    <Tabs screenOptions={{
        //top header
        headerStyle: {
            backgroundColor:  '#25292e', //color for top header
        },
        headerShadowVisible: false, //removes shadow
        headerTintColor: '#fff',

        //for tab bar
        tabBarActiveTintColor: "#ffd33d", //color of active tab
        tabBarStyle: {
            backgroundColor: '#25292e',
        }
        
    }}>
      <Tabs.Screen
        name="index" //refers to app/(tabs)/index.tsx
        options={{
            title: 'Home',
            //this function is automatically called by expo router
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? 'home-sharp': 'home-outline'} color={color} size={24}/>
            )
        }} 
      />
      
      <Tabs.Screen
        name="about" //refers to app/(tabs)/about.tsx
        options={{
            title: 'About',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? 'information-circle': 'information-circle-outline'} color={color} size={24}/>
            )
        }} 
      />
    </Tabs>
  );
}
