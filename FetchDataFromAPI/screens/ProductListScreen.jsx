import {useEffect, useState} from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native'

const ProductListScreen = () => {
  const URL = 'https://fakestoreapi.com/products' // API URL

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [erorr, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Someting went wrong')
        }

        return response.json()
      })
      .then((data) => {
        setProducts(data)
        setIsLoading(false)
      })
      .catch((erorr) => {
        setError(erorr.message)
      })
  }

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator color="red" size="large"/>
      ) : erorr ? (
        <Text style={styles.errorStyle}>{erorr}</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item}) => (
            <View style={styles.cardContainer}>
              <Image source={{uri: item.image}} style={styles.image}/>
              <Text style={{fontSize: 18, textAlign: 'center'}}>
                {item.price}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

export default ProductListScreen

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
