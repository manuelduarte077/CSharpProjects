import * as React from "react";
import {
  Animated,
  View,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from "react-native";

export default function App() {
  const { width } = useWindowDimensions();

  const IMAGE_WIDTH = React.useMemo(() => width * 0.7, [width]);

  const IMAGE_HEIGHT = React.useMemo(() => IMAGE_WIDTH * 1.54, [IMAGE_WIDTH]);

  const images = React.useMemo(
    () => [
      "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
    ],
    []
  );

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <StatusBar hidden />

      <View style={styles.container}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [0, 1, 0],
            });

            return (
              <>
                <View style={StyleSheet.absoluteFillObject}>
                  <Animated.Image
                    blurRadius={25}
                    source={{ uri: item }}
                    style={[StyleSheet.absoluteFillObject, { opacity }]}
                  />
                </View>
                <View
                  style={{
                    width,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Animated.Image
                    style={{
                      width: IMAGE_WIDTH,
                      height: IMAGE_HEIGHT,
                      resizeMode: "cover",
                      borderRadius: 16,
                      opacity,
                    }}
                    source={{ uri: item }}
                  />
                </View>
              </>
            );
          }}
          keyExtractor={(url) => url}
          data={images}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
