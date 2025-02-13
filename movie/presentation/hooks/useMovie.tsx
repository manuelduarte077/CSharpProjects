import { getByMovieIdAction } from "@/core/actions/movie/get-movie-by-id";
import { useQuery } from "@tanstack/react-query";

export const useMovie = (id: number) => {
  const movieQuery = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getByMovieIdAction(id),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    movieQuery,
  };
};
