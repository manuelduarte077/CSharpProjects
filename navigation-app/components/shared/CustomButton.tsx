import { Pressable, PressableProps, Text } from "react-native";
import React from "react";

interface CustomButtonProps extends PressableProps {
  children: string;
  color: "primary" | "secondary" | "tertiary";
  variant?: "contained" | "outlined";
  className?: string;
}

export default function CustomButton({
  children,
  color = "primary",
  onPress,
  onLongPress,
  variant = "contained",
  className,
}: CustomButtonProps) {
  // This is a simple switch statement to determine the color of the button
  const btnColor = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    tertiary: "bg-tertiary",
  }[color];

  const textColor = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
  }[color];

  if (variant === "outlined") {
    return (
      <Pressable
        className={`p-3 ${className}`}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Text className={`text-center ${textColor} font-work-medium`}>{children}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      className={`p-3 rounded-md ${btnColor} active:opacity-90 ${className}`}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text className="text-white text-center font-work-medium">{children}</Text>
    </Pressable>
  );
}
