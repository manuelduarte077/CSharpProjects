import { moviewApi } from "@/core/api/movie-api";
import { MovieDBMoviesResponse } from "@/infrastructure/interface/moviedb-response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

interface Options {
  page?: number;
  limit?: number;
}

export const topRatedMoviesAction = async ({
  page = 1,
  limit = 10,
}: Options) => {
  try {
    const { data } = await moviewApi.get<MovieDBMoviesResponse>("/top_rated", {
      params: { page: page },
    });

    // console.log(JSON.stringify(data.results, null, 2));
    const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie);

    return movies;
  } catch (error) {
    console.error(error);
    throw Error("Cannot fetch top rated movies");
  }
};
