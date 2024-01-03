import React from 'react'

import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native'
import {
  RedHatDisplay_400Regular,
  RedHatDisplay_500Medium,
  RedHatDisplay_700Bold,
  useFonts,
} from '@expo-google-fonts/red-hat-display'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../components/config/theme'
import { TextInput } from '../components/TextInput/TextInput'

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

        <View style={styles.inputContainer}>
          <TextInput placeholder="Email" />
          <TextInput placeholder="Password" secureTextEntry style={styles.passwordInput} />
        </View>

        <View>
          <Button title="Log In" />
          <Button title="Forgot your password?" />
        </View>
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

  inputContainer: {
    marginTop: theme.spacing.lg,
    flex: 1,
  },

  passwordInput: {
    marginTop: theme.spacing.md,
  },
})
