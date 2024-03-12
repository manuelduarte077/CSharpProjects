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
          throw new Error('Wrong')
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
          keyExtractor={(item) => item.name}
          ListEmptyComponent={
            <Text style={{ fontSize: 18, textAlign: 'center' }}>
              No Characters Found
            </Text>
          }
          showsVerticalScrollIndicator={false}
          data={character}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                {item.house}
              </Text>
              <Image style={styles.imageCard} source={{ uri: item.image }} />
              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {item.name}
              </Text>

              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {item.actor}
              </Text>

              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {item.dateOfBirth ?? 'No Data'}
              </Text>

              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {item.uri ?? 'No Data'}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  imageCard: {
    height: 200,
    width: 200,
  },
  errorStyle: {
    color: 'red',
    fontSize: 18,
  },
})
