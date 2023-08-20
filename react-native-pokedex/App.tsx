import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native'

interface Pokemon {
  name: string
  url: string
}

export default function App() {
  const [pokemon, setPokemon] = useState([])
  const [next, setNext] = useState('')

  const [isLoadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.results)
        setNext(data.next)
      })
  }, [])

  const loadMore = () => {
    if (isLoadingMore) return
    if (next) {
      setLoadingMore(true)
      fetch(next)
        .then((response) => response.json())
        .then((data) => {
          setPokemon((prevPokemon) => [...prevPokemon, ...data.results])
          setNext(data.next)
          setLoadingMore(false)
        })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        onEndReached={loadMore}
        ListFooterComponent={() =>
          isLoadingMore ? <ActivityIndicator /> : null
        }
      />
    </SafeAreaView>
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
