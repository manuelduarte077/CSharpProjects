import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";

interface FABProps {
  label: string;
  position: "left" | "right";
  // Method to call when the button is pressed
  onPress?: () => void;
  onLongPress?: () => void;
}

export default function FAB({
  label,
  onPress,
  onLongPress,
  position = "right",
}: FABProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.floatingButton,
        position === "left" ? styles.positionLeft : styles.positionRight,
        pressed ? { opacity: 0.5 } : { opacity: 1 }, // Change the opacity when pressed
      ]}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Text style={styles.floatingTextButton}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatingTextButton: {
    color: "white",
    fontSize: 20,
  },
  floatingButton: {
    position: "absolute", // position the button
    bottom: 20,
    backgroundColor: "#65558f",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  positionRight: {
    right: 20,
  },
  positionLeft: {
    left: 20,
  },
});
