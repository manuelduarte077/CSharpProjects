import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/Colors";
import ThemeToggle from "../../components/ThemeToggle";

export default function index() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const buttonScale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Scanner
        </Text>
        <ThemeToggle />
      </View>
      <View
        style={[
          styles.cameraContainer,
          { backgroundColor: colors.cardBackground },
        ]}
      >
        <View style={styles.cameraPlaceholder}>
          <LinearGradient
            colors={[colors.cardBackground, `${colors.cardBackground}80`]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text
              style={[
                styles.placeholderText,
                { color: colors.placeholderText },
              ]}
            >
              Camera View
            </Text>
          </LinearGradient>
        </View>
      </View>
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={[
            styles.scanButton,
            { backgroundColor: colors.buttonBackground },
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <Text style={[styles.scanButtonText, { color: colors.buttonText }]}>
            Scan QR Code
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraPlaceholder: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.7,
  },
  scanButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
