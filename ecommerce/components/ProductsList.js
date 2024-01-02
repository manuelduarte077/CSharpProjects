import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native'
import { useEffect, useState } from 'react'

import ProductCard from './ProductCard'

export default function ProductsList() {
  const URL = 'https://fakestoreapi.com/products'

  const [products, setProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data for that resource')
        }

        return res.json()
      })
      .then(
        (result) => {
          setProducts(result)
          setIsLoaded(false)
        },
        (error) => {
          setError(error.message)
        }
      )
  }

  return isLoaded ? (
    <ActivityIndicator color="red" size="large" />
  ) : error ? (
    <Text style={styles.errorStyle}>{error}</Text>
  ) : (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard {...item} />}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  )
}

const styles = StyleSheet.create({
  errorStyle: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
