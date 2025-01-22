import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_COUNTRIES} from '../graphql/queries';
import {CountriesData} from '../types/countries';

export default function CountriesList() {
  // Fetch the data
  const {loading, error, data} = useQuery<CountriesData>(GET_COUNTRIES);

  if (loading) {return <Text style={styles.message}>Loading...</Text>;}
  if (error) {return <Text style={styles.message}>Error: {error.message}</Text>;}

  return (
    <SafeAreaView>
      <Text style={styles.appBar}>Countries</Text>
      <FlatList
        data={data?.countries}
        keyExtractor={item => item.code}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.text}>
              {item.name} {item.emoji}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  message: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
