import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ContinentCard from '../components/ContinentCard';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_CONTINENTS} from '../queries';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  MainTabs: undefined;
  ContinentDetail: {code: string; name: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

export default function ContinentsList({navigation}: Props) {
  const {loading, error, data} = useQuery(GET_CONTINENTS);

  if (loading) {
    return <LoadingState message="Loading continents..." />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
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
          <ContinentCard
            name={item.name}
            code={item.code}
            onPress={() => navigation.navigate('ContinentDetail', {code: item.code, name: item.name})}
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
  listContainer: {
    padding: 16,
  },
});