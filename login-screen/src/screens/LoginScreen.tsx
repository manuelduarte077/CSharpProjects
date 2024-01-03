import React from 'react'

import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import {
  RedHatDisplay_400Regular,
  RedHatDisplay_500Medium,
  RedHatDisplay_700Bold,
  useFonts,
} from '@expo-google-fonts/red-hat-display'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../components/config/theme'

export default function LoginScreen() {
  /// SafeArea
  const insets = useSafeAreaInsets()

  /// Fonts
  let [fontsLoaded, fontError] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_500Medium,
    RedHatDisplay_700Bold,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.title}>Login Screen</Text>

        {/* Add your code here */}
        <Text style={{ fontFamily: 'RedHatDisplay_500Medium', fontSize: 20 }}>Hello World!</Text>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    margin: theme.spacing.md,
  },

  title: {
    fontSize: theme.fontSize.title,
    fontFamily: 'RedHatDisplay_700Bold',
    textAlign: 'center',
  },
})
