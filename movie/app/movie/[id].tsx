import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { getByMovieIdAction } from "@/core/actions/movie/get-movie-by-id";
import { useMovie } from "@/presentation/hooks/useMovie";

const MovieDetail = () => {
  const { id } = useLocalSearchParams();

  const { movieQuery } = useMovie(+id);
  if (movieQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="mb-4">Espere por favor</Text>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>{movieQuery.data?.title ?? "No tiene"}</Text>
    </ScrollView>
  );
};

export default MovieDetail;
