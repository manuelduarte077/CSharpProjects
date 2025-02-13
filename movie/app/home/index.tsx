import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useMovies } from "@/presentation/hooks/useMovies";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MainSlideshow from "@/presentation/movies/components/MainSlideshow";
import MovieHorizontalList from "@/presentation/movies/popular/MovieHorizontalList";

export default function HomeScreen() {
  const safeArea = useSafeAreaInsets();
  const { nowPlayingQuery, popularMoviesQuery } = useMovies();

  if (nowPlayingQuery.isLoading) {
    return (
      <View className="justify-center items-center flex-1">
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <View className="mt-4" style={{ paddingTop: safeArea.top }}>
      <Text className="text-3xl font-bold px-4 mb-2">Cinemateca</Text>

      <MainSlideshow movies={nowPlayingQuery.data ?? []} />

      <MovieHorizontalList
        title="Populares"
        movies={popularMoviesQuery.data ?? []}
      />
    </View>
  );
}
