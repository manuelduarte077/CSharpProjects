import {
  View,
  Text,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Movie } from "@/infrastructure/interface/movie.interface";
import MoviePoster from "./MoviePoster";

interface Props {
  title: string;
  movies: Movie[];
  className?: string;

  // fetch more movies
  loadNextPage?: () => void;
}

const MovieHorizontalList = ({
  title,
  movies,
  className,
  loadNextPage,
}: Props) => {
  const isLoading = useRef(false); // to prevent multiple requests

  // infinite scroll effect
  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;
    if (!isEndReached) return;

    isLoading.current = true;

    console.log("fetch more movies");
    loadNextPage && loadNextPage();
  };

  return (
    <View className={`${className}`}>
      {title && <Text className="text-3xl font-light px-4 mb-2">{title}</Text>}

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
        onScroll={onScroll}
      />
    </View>
  );
};

export default MovieHorizontalList;
