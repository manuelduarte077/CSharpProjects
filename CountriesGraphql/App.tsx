import React from 'react';
import {ApolloProvider} from '@apollo/client';
import client from './src/api/ApolloClient';
import ContinentsList from './src/screens/ContinentsList';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ContinentsList />
    </ApolloProvider>
  );
}
