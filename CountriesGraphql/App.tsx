import React from 'react';
import {ApolloProvider} from '@apollo/client';
import client from './src/api/ApolloClient';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
