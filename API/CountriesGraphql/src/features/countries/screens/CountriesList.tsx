import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import {useQuery} from '@apollo/client';
import {GET_COUNTRIES} from '../queries';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import CountryCard from '../components/CountryCard';

type RootStackParamList = {
  CountryDetail: {
    code: string;
    name: string;
    emoji: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList>;

export default function CountriesList({navigation}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const {loading, error, data} = useQuery(GET_COUNTRIES);

  const filteredCountries = useMemo(() => {
    if (!data?.countries) return [];
    return data.countries.filter((country: {name: string}) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data?.countries, searchQuery]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading countries...</Text>
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
        <Text style={styles.headerTitle}>World Countries</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search countries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <FlatList
        data={filteredCountries}
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <CountryCard
            name={item.name}
            code={item.code}
            emoji={item.emoji}
            onPress={() => navigation.navigate('CountryDetail', item)}
          />
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333333',
  },
  listContainer: {
    padding: 16,
  },
  countryItem: {
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
    shadowRadius: 1,
  },
  countryItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  countryItemPressed: {
    backgroundColor: '#e0e0e0',
  },
  countryEmoji: {
    fontSize: 24,
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