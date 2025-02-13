import { FlatList, Text, View } from "react-native";
import React from "react";
import { products } from "@/store/products.store";
import { Link } from "expo-router";

export default function Products() {
  return (
    <View className="flex flex-1">
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View className="mt-10">
            <Text className="text-2xl font-work-black">{item.title}</Text>
            <Text className="text-lg">{item.description}</Text>

            <View className="flex flex-row justify-between mt-2">
              <Text className="font-work-black">{item.price}</Text>
              <Link
                href={`/tabs/(stack)/products/${item.id}`}
                className="text-primary"
              >
                Ver detalles
              </Link>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}
