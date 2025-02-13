import { moviewApi } from "@/core/api/movie-api";
import { MovieDBMoviesResponse } from "@/infrastructure/interface/moviedb-response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

export const nowPlayingAction = async () => {
  try {
    const { data } = await moviewApi.get<MovieDBMoviesResponse>("/now_playing");

    // console.log(JSON.stringify(data.results, null, 2));
    const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie);

    return movies;
  } catch (error) {
    console.error(error);
    throw "Cannot fetch now playing movies";
  }
};
