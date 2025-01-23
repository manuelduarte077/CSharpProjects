import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type ErrorStateProps = {
  message: string;
};

export default function ErrorState({message}: ErrorStateProps) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>Error: {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});