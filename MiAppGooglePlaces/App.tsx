import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Alert,
  Image,
  SafeAreaView,
  Modal,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Region } from "react-native-maps";

interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  business_status: string;
  rating: number;
  user_ratings_total: number;
  utc_offset_minutes: number;
  types: string[];
  icon: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Reemplaza esta API key por la tuya (o utiliza variables de entorno)
const API_KEY = "AIzaSyBZGbLTAnBvUU2TqWlS2J0cQoOzSfLXsWI";

const App: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);
  // Estado para almacenar el place seleccionado y mostrar sus detalles
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // Solicitar permisos y obtener la ubicación actual
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        const errorMsg = "Permiso para acceder a la ubicación denegado";
        setLocationErrorMsg(errorMsg);
        Alert.alert(
          "Permiso denegado",
          "No se pudo obtener la ubicación. Habilita el permiso en la configuración."
        );
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  // Cuando ya se tenga la ubicación, se carga automáticamente una búsqueda predeterminada
  useEffect(() => {
    if (location) {
      loadDefaultPlaces();
    }
  }, [location]);

  // Función que realiza la búsqueda predeterminada (por ejemplo, "coffee")
  // y limita los resultados a 5 para la carga inicial.
  const loadDefaultPlaces = async (): Promise<void> => {
    try {
      const defaultQuery = encodeURIComponent("coffee");
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${defaultQuery}&location=${location!.latitude},${location!.longitude}&radius=10000&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        // Se toman solo los 5 primeros resultados para la carga inicial
        setPlaces(data.results.slice(0, 5));
      } else {
        console.error(
          "Error en la búsqueda predeterminada:",
          data.status,
          data.error_message
        );
      }
    } catch (error) {
      console.error("Error al cargar la búsqueda predeterminada:", error);
    }
  };

  // Función de búsqueda manual; en este caso se muestran todos los resultados de la API.
  const searchPlaces = async (): Promise<void> => {
    // Evitar múltiples peticiones concurrentes
    if (loading) return;

    if (!searchText) {
      Alert.alert("Atención", "Por favor ingresa un término de búsqueda.");
      return;
    }
    if (!location) {
      Alert.alert(
        "Ubicación no disponible",
        "No se pudo obtener tu ubicación. Intenta nuevamente."
      );
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      const query = encodeURIComponent(searchText);
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location.latitude},${location.longitude}&radius=10000&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        // Se muestran TODOS los resultados de la búsqueda manual
        setPlaces(data.results);
      } else {
        console.error("Error en la búsqueda:", data.status, data.error_message);
        setPlaces([]);
        Alert.alert(
          "Error",
          "No se encontraron resultados. Intenta con otro término de búsqueda."
        );
      }
    } catch (error) {
      console.error("Error al consultar la API:", error);
      Alert.alert("Error", "Ocurrió un error al buscar los lugares.");
    } finally {
      setLoading(false);
    }
  };

  // Renderiza cada ítem de la lista; al hacer clic, se muestran los detalles del place
  const renderItem = ({ item }: { item: Place }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => setSelectedPlace(item)}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.formatted_address}</Text>
        <Text>{item.business_status}</Text>
        <Text style={{ fontSize: 10, color: "gray" }}>
          {item.utc_offset_minutes}
        </Text>
        <Text>{item.rating}</Text>
        <Text>{item.user_ratings_total}</Text>
        <Image source={{ uri: item.icon }} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
  );

  // Definir la región del mapa centrada en la ubicación del usuario
  const mapRegion: Region | undefined = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Riconsitos</Text>

      {location && mapRegion ? (
        <MapView style={styles.map} region={mapRegion} showsUserLocation>
          {places.map((place) => (
            <Marker
              key={place.place_id}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              title={place.name}
              description={place.formatted_address}
              // Al presionar el marker se actualiza el place seleccionado
              onPress={() => setSelectedPlace(place)}
            >
              <Image source={{ uri: place.icon }} style={styles.markerIcon} />
            </Marker>
          ))}
        </MapView>
      ) : (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginVertical: 20 }}
        />
      )}

      {/* Controles de búsqueda */}
      <View style={styles.controls}>
        {locationErrorMsg && (
          <Text style={styles.errorText}>{locationErrorMsg}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Ingresa el lugar que buscas..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={searchPlaces}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.button} onPress={searchPlaces}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Indicador de carga y lista de resultados */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      )}

      {/* Modal para mostrar los detalles del place seleccionado */}
      <Modal
        visible={selectedPlace !== null}
        animationType="slide"
        onRequestClose={() => setSelectedPlace(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setSelectedPlace(null)}
          >
            <Text style={styles.modalCloseText}>Cerrar</Text>
          </TouchableOpacity>
          {selectedPlace && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedPlace.name}</Text>
              <Image
                source={{ uri: selectedPlace.icon }}
                style={styles.modalImage}
              />
              <Text style={styles.modalAddress}>
                {selectedPlace.formatted_address}
              </Text>
              <Text style={styles.modalStatus}>
                Status: {selectedPlace.business_status}
              </Text>
              <Text style={styles.modalRating}>
                Rating: {selectedPlace.rating} ({selectedPlace.user_ratings_total} reseñas)
              </Text>
              <Text style={styles.modalOffset}>
                UTC Offset: {selectedPlace.utc_offset_minutes}
              </Text>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  controls: {
    borderTopEndRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  item: {
    margin: 10,
    borderRadius: 8,
    padding: 12,
    borderColor: "gray",
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  markerIcon: {
    width: 30,
    height: 30,
  },
  marker: {
    elevation: 10,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 10,
    borderRadius: 8,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  modalCloseText: {
    fontSize: 16,
    color: "#4285F4",
  },
  modalContent: {
    marginTop: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  modalAddress: {
    fontSize: 16,
    marginBottom: 4,
  },
  modalStatus: {
    fontSize: 16,
    marginBottom: 4,
  },
  modalRating: {
    fontSize: 16,
    marginBottom: 4,
  },
  modalOffset: {
    fontSize: 14,
    color: "gray",
  },
});