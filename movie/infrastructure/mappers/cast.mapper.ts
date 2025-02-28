import { Cast } from "../interface/cast.interface";
import { MovieDBCast } from "../interface/moviedb-credits.response";

export class CastMapper {
  static fromTheMovieDBToCast = (actor: MovieDBCast): Cast => {
    return {
      id: actor.id,
      name: actor.name,
      character: actor.character || "No character",
      avatar: actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : "https://via.placeholder.com/500",
    };
  };
}
