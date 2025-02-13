import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useMovie } from "@/presentation/hooks/useMovie";
import MovieHeader from "@/presentation/components/movie/MovieHeader";
import MovieDescription from "@/presentation/components/movie/MovieDescription";

const MovieDetail = () => {
  const { id } = useLocalSearchParams();

  const { movieQuery } = useMovie(+id);
  if (movieQuery.isLoading || !movieQuery.data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="mb-4">Espere por favor</Text>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <ScrollView>
      <MovieHeader
        posterPath={movieQuery.data.posterPath}
        title={movieQuery.data.title}
        originalTitle={movieQuery.data.originalTitle}
      />

      <MovieDescription movie={movieQuery.data} />
    </ScrollView>
  );
};

export default MovieDetail;
