import { SafeAreaView, View } from "react-native";
import React from "react";
import CustomButton from "@/components/shared/CustomButton";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="px-10">
        <CustomButton className="mb-2" color="primary" onPress={() => router.push("/tabs/(stack)/products")}>
          Products
        </CustomButton>

        <CustomButton className="mb-2" color="secondary" onPress={() => router.push("/tabs/(stack)/profile")}>
          Profile
        </CustomButton>
        <CustomButton className="mb-2" variant="outlined" color="tertiary" onPress={() => router.push("/tabs/(stack)/settings")}>
          Settings
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}
