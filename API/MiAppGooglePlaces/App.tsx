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
import MapView, { Marker, Region } from "react-native-maps";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { searchPlacesByQuery } from "./src/api/places";
import { Place } from "./src/types/places";
import { useLocation } from "./src/hooks/useLocation";

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
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const {
    location,
    errorMsg,
    isLoading: locationLoading,
    requestLocation,
  } = useLocation();

  const {
    data: places = [],
    isLoading: placesLoading,
    refetch,
  } = useQuery({
    queryKey: ["places", searchText, location],
    queryFn: () =>
      location
        ? searchPlacesByQuery(
            searchText || "restaurante",
            location.latitude,
            location.longitude,
            10000,
            10
          )
        : Promise.reject("Ubicación no disponible"),
    enabled: !!location,
    staleTime: 5 * 60 * 1000,
  });

  const handleLocationRequest = async () => {
    Alert.alert(
      "Ubicación necesaria",
      "Para mostrarte lugares cercanos, necesitamos acceder a tu ubicación",
      [
        {
          text: "No permitir",
          style: "cancel",
          onPress: () => {
            Alert.alert(
              "Funcionalidad limitada",
              "Sin acceso a tu ubicación, algunas funciones no estarán disponibles"
            );
          }
        },
        {
          text: "Permitir",
          onPress: async () => {
            const success = await requestLocation();
            if (!success) {
              Alert.alert(
                "Error",
                "No se pudo obtener tu ubicación. Por favor, intenta nuevamente."
              );
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    if (errorMsg) {
      handleLocationRequest();
    }
  }, [errorMsg]);

  const handleSearch = () => {
    if (!location) {
      handleLocationRequest();
      return;
    }

    if (!searchText) {
      Alert.alert("Atención", "Por favor ingresa un término de búsqueda.");
      return;
    }

    Keyboard.dismiss();
    refetch();
  };

  if (locationLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>
          Obteniendo tu ubicación...
        </Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No podemos acceder a tu ubicación
        </Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={handleLocationRequest}
        >
          <Text style={styles.buttonText}>
            Permitir acceso a ubicación
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

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

      <View style={styles.controls}>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
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

      {placesLoading ? (
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
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text style={styles.emptyListText}>
                {placesLoading 
                  ? "Buscando lugares..." 
                  : "No se encontraron lugares cercanos"}
              </Text>
            </View>
          }
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
                Rating: {selectedPlace.rating} (
                {selectedPlace.user_ratings_total} reseñas)
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  retryButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  listHeader: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listHeaderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emptyList: {
    padding: 20,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
