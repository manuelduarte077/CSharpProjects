import { moviewApi } from "@/core/api/movie-api";
import { MovieDBMoviesResponse } from "@/infrastructure/interface/moviedb-response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

export const upcomingMoviesAction = async () => {
  try {
    const { data } = await moviewApi.get<MovieDBMoviesResponse>("/upcoming");

    // console.log(JSON.stringify(data.results, null, 2));
    const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie);

    return movies;
  } catch (error) {
    console.error(error);
    throw Error("Cannot fetch upcoming movies");
  }
};
