import { useProductsQuery } from "@/api/useProductsQuery";
import { Text, View, StyleSheet, FlatList, SafeAreaView, Image, ActivityIndicator } from "react-native";

export default function Index() {
  const { data: products, isLoading, error } = useProductsQuery();

  if (isLoading) return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  const cutDescription = (description: string) => {
    return description.length > 80 ? description.substring(0, 100) + "..." : description;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Text style={styles.description}>{cutDescription(item.description)}</Text>
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>{item.category}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    color: "#333",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 6,
  },
  categoryContainer: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  category: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});