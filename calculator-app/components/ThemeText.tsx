import { Text, type TextProps, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";

interface ThemeTextProps extends TextProps {
  variant?: "h1" | "h2";
}

const ThemeText = ({ children, variant = "h1", ...rest }: ThemeTextProps) => {
  return (
    <Text
      style={[styles.text, variant === "h1" ? styles.h1 : styles.h2]}
      {...rest}
      numberOfLines={1}
      adjustsFontSizeToFit
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "white",
    fontFamily: "SpaceMono",
  },
  h1: {
    ...globalStyles.mainResult,
  },
  h2: {
    ...globalStyles.subResult,
  },
});

export default ThemeText;
