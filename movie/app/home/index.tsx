import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useMovies } from "@/presentation/movies/hooks/useMovies";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const safeArea = useSafeAreaInsets(); 
  const { nowPlayingQuery } = useMovies();

  if (nowPlayingQuery.isLoading) {
    return (
      <View className="justify-center items-center flex-1">
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <View className="mt-4" style={{ paddingTop: safeArea.top }}>   
      <Text className="text-3xl font-bold px-4 mb-2">Home Screen</Text>
    </View> 
  );
}
