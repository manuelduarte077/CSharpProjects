import { moviewApi } from "@/core/api/movie-api";
import { MovieDBCreditResponse } from "@/infrastructure/interface/moviedb-credits.response";
import { CastMapper } from "@/infrastructure/mappers/cast.mapper";

export const getMovieCastAction = async (movieId: number) => {
  try {
    const { data } = await moviewApi.get<MovieDBCreditResponse>(
      `/${movieId}/credits`
    );

    return data.cast.map(CastMapper.fromTheMovieDBToCast);
  } catch (error) {
    console.error(error);
    throw new Error("Cannot load the cast");
  }
};
