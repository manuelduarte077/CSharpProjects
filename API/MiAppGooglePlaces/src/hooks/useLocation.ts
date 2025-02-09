import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";
import { Coordinates } from "../types/places";

export const useLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const openSettings = async () => {
    await Linking.openSettings();
  };

  const checkLocationPermission = async () => {
    const { status: existingStatus } =
      await Location.getForegroundPermissionsAsync();
    return existingStatus;
  };

  const requestLocation = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Primero verificamos el estado actual del permiso
      const currentPermission = await checkLocationPermission();

      // Si el permiso ya fue denegado anteriormente
      if (currentPermission === Location.PermissionStatus.DENIED) {
        Alert.alert(
          "Permiso de ubicación requerido",
          "Esta aplicación necesita acceder a tu ubicación para mostrar lugares cercanos. Por favor, habilita el acceso a la ubicación en la configuración.",
          [
            {
              text: "Cancelar",
              style: "cancel",
              onPress: () => setErrorMsg("Permiso de ubicación denegado"),
            },
            {
              text: "Abrir Configuración",
              onPress: openSettings,
            },
          ]
        );
        setIsLoading(false);
        return false;
      }

      // Solicitar permiso
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== Location.PermissionStatus.GRANTED) {
        setErrorMsg("Se requiere permiso para acceder a la ubicación");
        setIsLoading(false);
        return false;
      }

      // Obtener ubicación actual
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      return true;
    } catch (error) {
      Alert.alert(
        "Error de ubicación",
        "No se pudo obtener tu ubicación. Por favor, verifica que el GPS esté activado y vuelve a intentarlo.",
        [
          {
            text: "OK",
            onPress: () => setErrorMsg("Error al obtener la ubicación"),
          },
        ]
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar y solicitar permisos al montar el componente
  useEffect(() => {
    requestLocation();
  }, []);

  return {
    location,
    errorMsg,
    isLoading,
    requestLocation,
    checkLocationPermission,
  };
};
