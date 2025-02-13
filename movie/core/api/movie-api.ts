import axios from "axios";

export const moviewApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MOVIE_API_URL,
  params: {
    language: process.env.EXPO_PUBLIC_MOVIE_API_LANGUAGE,
    api_key: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  },
});
