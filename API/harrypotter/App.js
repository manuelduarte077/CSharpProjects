import { SafeAreaProvider } from 'react-native-safe-area-context'
import CharacterList from './src/Screens/CharacterList'

export default function App() {
  return (
    <SafeAreaProvider>
      <CharacterList />
    </SafeAreaProvider>
  )
}
