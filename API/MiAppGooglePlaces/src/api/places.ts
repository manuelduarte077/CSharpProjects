import axios from "axios";
import { Place } from "../types/places";

const API_KEY = "AIzaSyBZGbLTAnBvUU2TqWlS2J0cQoOzSfLXsWI";

const placesApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place",
});

interface PlacesResponse {
  results: Place[];
  status: string;
  error_message?: string;
}

export const searchPlacesByQuery = async (
  query: string,
  latitude: number,
  longitude: number
): Promise<Place[]> => {
  const { data } = await placesApi.get<PlacesResponse>("/textsearch/json", {
    params: {
      query,
      location: `${latitude},${longitude}`,
      radius: 10000,
      key: API_KEY,
    },
  });

  if (data.status !== "OK") {
    throw new Error(data.error_message || "Error fetching places");
  }

  return data.results;
};
