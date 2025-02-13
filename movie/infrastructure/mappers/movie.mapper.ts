import { CompleteMovie, Movie } from "../interface/movie.interface";
import { MovieDBMovieResponse } from "../interface/moviedb-movie.response";
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

  static fromTheMovieDBToCompleteMovie = (
    movie: MovieDBMovieResponse
  ): CompleteMovie => {
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
      budget: movie.budget,
      revenue: movie.revenue,
      genres: movie.genres.map((genre) => genre.name),
      duration: movie.runtime,
      homePage: movie.homepage,
      originalTitle: movie.original_title,
      productionCompanies: movie.production_companies.map(
        (company) => company.name
      ),
      productionCountries: movie.production_countries.map(
        (country) => country.name
      ),
    };
  };
}
