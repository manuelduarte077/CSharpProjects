import { moviewApi } from "@/core/api/movie-api";
import { MovieDBMoviesResponse } from "@/infrastructure/interface/moviedb-response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

export const popularMoviesAction = async () => {
  try {
    const { data } = await moviewApi.get<MovieDBMoviesResponse>("/popular");

    // console.log(JSON.stringify(data.results, null, 2));
    const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie);

    return movies;
  } catch (error) {
    console.error(error);
    throw Error("Cannot fetch popular movies");
  }
};
