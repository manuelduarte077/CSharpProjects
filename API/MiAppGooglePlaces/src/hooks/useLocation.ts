import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Coordinates } from "../types/places";

export const useLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const requestLocation = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Se requiere permiso para acceder a la ubicación");
        return false;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      return true;
    } catch (error) {
      setErrorMsg("Error al obtener la ubicación");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return {
    location,
    errorMsg,
    isLoading,
    requestLocation,
  };
};
