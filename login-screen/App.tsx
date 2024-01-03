import { View, StyleSheet, StatusBar } from 'react-native'

import {
  RedHatDisplay_400Regular,
  RedHatDisplay_500Medium,
  RedHatDisplay_600SemiBold,
  RedHatDisplay_700Bold,
  useFonts,
} from '@expo-google-fonts/red-hat-display'
import { NavigationContainer } from '@react-navigation/native'

import { BaseRoute } from './src/routes'
import { useThemeVariant } from './src/hooks'

export default function App() {
  const isDark = useThemeVariant() === 'dark'

  /// Fonts
  let [fontsLoaded, fontError] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_500Medium,
    RedHatDisplay_600SemiBold,
    RedHatDisplay_700Bold,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <BaseRoute />
      </View>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
