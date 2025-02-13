import {
  useWindowDimensions,
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  posterPath: string;
  originalTitle: string;
  title: string;
}

const MovieHeader = ({ posterPath, originalTitle, title }: Props) => {
  const { height: screenHeight } = useWindowDimensions();
  return (
    <>
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "transparent"]}
        start={[0, 0]}
        style={{
          height: screenHeight * 0.4,
          position: "absolute",
          zIndex: 1,
          width: "100%",
        }}
      />

      <View
        style={{
          position: "absolute",
          top: 35,
          left: 10,
          zIndex: 99,
          elevation: 9,
        }}
      >
        <Pressable onPress={() => router.dismiss()}>
          <Ionicons
            className="shadow"
            name="chevron-back"
            size={24}
            color="white"
          />
        </Pressable>
      </View>

      <View
        style={{
          height: screenHeight * 0.7,
        }}
        className="shadow-xl shadow-black/20"
      >
        <View className="flex-1 rounded-[25px] overflow-hidden">
          <Image
            className="flex-1"
            source={{ uri: posterPath }}
            resizeMode="cover"
          />
        </View>

        <View className="px-5">
          <Text className="font-normal">{originalTitle}</Text>
          <Text className="font-semibold text-2xl">{title}</Text>
        </View>
      </View>
    </>
  );
};

export default MovieHeader;
