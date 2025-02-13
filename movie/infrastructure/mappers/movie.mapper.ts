import { Movie } from "../interface/movie.interface";
import { Result } from "../interface/moviedb-response";

export class MovieMapper {
  static fromTheMovieDBToMovie = (movie: Result): Movie => {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: new Date(movie.release_date).toLocaleDateString(),
      rating: movie.vote_average,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdropPath: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      video: movie.video,
      adult: movie.adult,
    };
  };
}
