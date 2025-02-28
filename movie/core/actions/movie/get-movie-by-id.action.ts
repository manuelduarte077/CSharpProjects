import { moviewApi } from "@/core/api/movie-api";
import { CompleteMovie } from "@/infrastructure/interface/movie.interface";
import { MovieDBMovieResponse } from "@/infrastructure/interface/moviedb-movie.response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

export const getByMovieIdAction = async (
  id: number | string
): Promise<CompleteMovie> => {
  try {
    const { data } = await moviewApi.get<MovieDBMovieResponse>(`/${id}`);

    // console.log(JSON.stringify(data, null, 2));
    return MovieMapper.fromTheMovieDBToCompleteMovie(data);
  } catch (error) {
    console.error(error);
    throw "Cannot fetch the movie";
  }
};
