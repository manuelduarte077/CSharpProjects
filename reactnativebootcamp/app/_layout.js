import { Stack, Link } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#544b81',
        },
        headerTintColor: '#fff',
        headerRight: () => (
          <Link href={'/settings'}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </Link>
        ),
      }}
    />
  )
}
