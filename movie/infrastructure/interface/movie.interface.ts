export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  rating: number;
  posterPath: string;
  backdropPath: string;
  video: boolean;
  adult: boolean;
}

export interface CompleteMovie extends Movie {
  genres: string[];
  budget: number;
  duration: number;
  originalTitle: string;
  productionCompanies: string[];
  productionCountries: string[];
  homePage: string;
  revenue: number;
}
