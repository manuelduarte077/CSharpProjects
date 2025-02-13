import { nowPlayingAction } from "@/core/actions/movies/now-playing.action";
import { popularMoviesAction } from "@/core/actions/movies/popular.action";
import { topRatedMoviesAction } from "@/core/actions/movies/top-rated.action";
import { upcomingMoviesAction } from "@/core/actions/movies/upcoming.action";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useMovies = () => {
  // Queries
  const nowPlayingQuery = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const popularMoviesQuery = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: popularMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  /// Infinite query for top rated movies (pagination)
  const topRatedMoviesQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["movies", "topRated"],
    queryFn: ({ pageParam }) => {
      console.log("fetching top rated movies", pageParam);  
      return topRatedMoviesAction({ page: pageParam });
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    getNextPageParam: (_, allPages) => allPages.length + 1,
  });

  const upcomingMoviesQuery = useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: upcomingMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    nowPlayingQuery,
    popularMoviesQuery,
    topRatedMoviesQuery,
    upcomingMoviesQuery,
  };
};
