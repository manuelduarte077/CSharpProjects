import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { theme, Text } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView />
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
