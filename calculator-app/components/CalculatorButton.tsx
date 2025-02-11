import { Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";
import { Colors } from "@/constants/Colors";
import * as Haptics from "expo-haptics";

interface CalculatorButtonProps {
  label: string;
  color?: string;
  blackText?: boolean;
  doubleSize?: boolean;
  onPress: () => void;
}

const CalculatorButton = ({
  label,
  onPress,
  color = Colors.darkGrey,
  blackText,
  doubleSize = false,
}: CalculatorButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        ...globalStyles.button,
        backgroundColor: color,
        opacity: pressed ? 0.8 : 1,
        width: doubleSize ? 180 : 80,
      })}
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
    >
      <Text
        style={{
          ...globalStyles.buttonText,
          color: blackText ? "black" : "white",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CalculatorButton;
