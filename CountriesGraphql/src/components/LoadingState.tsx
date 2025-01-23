import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

type LoadingStateProps = {
  message?: string;
};

export default function LoadingState({message = 'Loading...'}: LoadingStateProps) {
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>{message}</Text>
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
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
});