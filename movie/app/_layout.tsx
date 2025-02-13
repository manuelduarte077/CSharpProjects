import { Stack } from "expo-router";
import "../global.css";
import { View, Text } from "react-native";
import { nowPlayingAction } from "@/core/actions/movies/now-playing.action";

export default function RootLayout() {
  nowPlayingAction();

  return (
    <View>
      <Text className="text-2xl text-purple-500">Root Layout</Text>
    </View>
  );
}
