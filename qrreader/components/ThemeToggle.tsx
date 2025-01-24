import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Colors from '../constants/Colors';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];

  return (
    <TouchableOpacity
      style={[styles.themeToggle, { backgroundColor: colors.buttonBackground }]}
      onPress={toggleTheme}
    >
      <Ionicons
        name={theme === 'light' ? 'moon' : 'sunny'}
        size={20}
        color={colors.buttonText}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  themeToggle: {
    padding: 10,
    borderRadius: 20,
  },
});