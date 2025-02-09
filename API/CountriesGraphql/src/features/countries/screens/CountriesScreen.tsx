import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
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

export default function CountriesScreen({navigation}: Props) {
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
        <Text style={styles.headerTitle}>Countries</Text>
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
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  countryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  countryCardPressed: {
    backgroundColor: '#F8F8F8',
    transform: [{scale: 0.98}],
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  countryTextContainer: {
    flex: 1,
  },
  countryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  countryCode: {
    fontSize: 14,
    color: '#666666',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666666',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
  },
});