import { getMovieCastAction } from "@/core/actions/movie/get-cast-by-id.action";
import { getByMovieIdAction } from "@/core/actions/movie/get-movie-by-id.action";
import { useQuery } from "@tanstack/react-query";

export const useMovie = (id: number) => {
  const movieQuery = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getByMovieIdAction(id),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const castQuery = useQuery({
    queryKey: ["movie", id, "cast"],
    queryFn: () => getMovieCastAction(id),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    movieQuery,
    castQuery,
  };
};
