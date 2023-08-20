import { Stack } from 'expo-router'
import { Text, View, StyleSheet } from 'react-native'

export default function Settings() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Settings', headerRight: null }} />
      <Text>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
