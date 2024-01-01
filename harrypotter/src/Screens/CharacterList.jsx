import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function CharacterList() {
  const URL = 'https://hp-api.onrender.com/api/characters'

  const [character, setCharacter] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCharacters()
  }, [])

  const fetchCharacters = async () => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Someting went wrong')
        }

        return response.json()
      })
      .then((data) => {
        setCharacter(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      {isLoading ? (
        <ActivityIndicator color="red" size="large" />
      ) : error ? (
        <Text style={styles.errorStyle}>{error}</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={character}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                {item.house}
              </Text>
              <Image style={styles.image} source={{ uri: item.image }} />
              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {item.name}
              </Text>

              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {item.actor}
              </Text>

              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {item.dateOfBirth}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
  image: {
    height: 200,
    width: 200,
  },
  errorStyle: {
    color: 'red',
    fontSize: 18,
  },
})
