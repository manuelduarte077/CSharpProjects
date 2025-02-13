import { View, Text, FlatList } from "react-native";
import React from "react";
import { Movie } from "@/infrastructure/interface/movie.interface";
import MoviePoster from "../components/MoviePoster";

interface Props {
  title: string;
  movies: Movie[];
}

const MovieHorizontalList = ({ title, movies }: Props) => {
  return (
    <View>
      {title && <Text className="text-3xl font-bold px-4 mb-2">{title}</Text>}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <MoviePoster
            id={item.id}
            poster={item.posterPath}
            smallPoster={true}
          />
        )}
      />
    </View>
  );
};

export default MovieHorizontalList;
