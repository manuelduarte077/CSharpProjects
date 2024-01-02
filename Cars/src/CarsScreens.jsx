import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// URL
const URL = 'https://cdn.sixt.io/codingtask/cars';

const CarsScreens = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Someting went wrong');
        }

        return response.json();
      })
      .then(data => {
        setCars(data);
        setIsLoading(false);
      })
      .catch(errorMessage => {
        setError(errorMessage.message);
        setIsLoading(false);
      });
  };

  console.log(cars);

  return (
    <View style={{flex: 1, padding: 20}}>
      {isLoading ? (
        <ActivityIndicator color="red" size="large" />
      ) : error ? (
        <Text style={styles.errorStyle}>{error}</Text>
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              No Cars Found
            </Text>
          }
          showsVerticalScrollIndicator={false}
          data={cars}
          renderItem={({item}) => (
            <View style={styles.cardContainer}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                {item.name}
              </Text>
              <Image style={styles.image} source={{uri: item.carImageUrl}} />
              <Text>{item.modelName}</Text>
              <Text>{item.make}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CarsScreens;

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
});
