import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_CONTINENTS} from '../graphql/queries';
import {ContinentsData} from '../types/continents';

export default function ContinentsList() {
  const {loading, error, data} = useQuery<ContinentsData>(GET_CONTINENTS);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading continents...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>World Continents</Text>
      </View>
      <FlatList
        data={data?.continents}
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <View style={styles.continentItem}>
            <Text style={styles.continentItemText}>{item.name}</Text>
            <Text style={styles.continentCode}>{item.code}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  listContainer: {
    padding: 16,
  },
  continentItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  continentItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  continentCode: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
