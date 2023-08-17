import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

export default function App() {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.results)
      })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>PokedexAPP</Text>
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
