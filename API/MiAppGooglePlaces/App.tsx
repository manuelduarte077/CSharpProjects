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
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { searchPlacesByQuery } from "./src/api/places";
import { Place, Coordinates } from "./src/types/places";

const queryClient = new QueryClient();

// Wrapper component for React Query
export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

const App: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // React Query hook for places
  const { data: places = [], isLoading, refetch } = useQuery({
    queryKey: ['places', searchText, location],
    queryFn: () => 
      location
        ? searchPlacesByQuery(
            searchText || "coffee",
            location.latitude,
            location.longitude
          )
        : Promise.reject("No location available"),
    enabled: !!location,
    staleTime: 5 * 60 * 1000,
  });

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

  const handleSearch = () => {
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

    Keyboard.dismiss();
    refetch();
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
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
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
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 10,
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