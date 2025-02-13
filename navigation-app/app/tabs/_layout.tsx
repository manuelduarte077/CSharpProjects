import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="(stack)"
        
        options={{
          title: "Stack",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite/index"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Ionicons name="star-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
