import { View, Text } from "react-native";
import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { products } from "@/store/products.store";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();

  const product = products.find((product) => product.id === id);

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex flex-1 p-4">
      <Text className="text-2xl font-work-black">{product.title}</Text>
      <Text className="text-lg">{product.description}</Text>
      <Text className="font-work-black">{product.price}</Text>
    </View>
  );
}
