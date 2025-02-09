import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

interface State {
  name: string;
}

type RootStackParamList = {
  CountryDetail: {
    code: string;
    name: string;
    emoji: string;
  };
};

type Props = {
  route: {
    params: RootStackParamList['CountryDetail'];
  };
  navigation: any;
};

import {useQuery} from '@apollo/client';
import {GET_COUNTRY_DETAIL} from '../queries';

export default function CountryDetail({route, navigation}: Props) {
  const {code} = route.params;
  const {loading, error, data} = useQuery(GET_COUNTRY_DETAIL, {
    variables: {code},
  });

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
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

  const country = data.country;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{country.name}</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.flagContainer}>
          <Text style={styles.flag}>{country.emoji}</Text>
          <Text style={styles.countryName}>{country.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <InfoItem label="Capital" value={country.capital} />
          <InfoItem label="Currency" value={country.currency} />
          <InfoItem label="Phone" value={country.phone} />
          <InfoItem label="Native Name" value={country.native} />
          <InfoItem
            label="Languages"
            value={country.languages
              .map((lang: {name: string; native: string}) => lang.name)
              .join(', ')}
          />
          <InfoItem label="Continent" value={country.continent.name} />
          {country.states.length > 0 && (
            <InfoItem
              label="States"
              value={country.states
                .map((state: State) => state.name)
                .join(', ')}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoItem = ({label, value}: {label: string; value: string}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value || 'N/A'}</Text>
  </View>
);

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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  flagContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  flag: {
    fontSize: 100,
    marginBottom: 16,
  },
  countryName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  infoValue: {
    flex: 2,
    fontSize: 16,
    color: '#333333',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
});
