import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CountriesList from './CountriesList';
import ContinentsList from './ContinentsList';

const CountriesTabs = createBottomTabNavigator({
  screens: {
    ContinentsList: ContinentsList,
    CountriesList: CountriesList,
  },
});

export default function HomeScreen() {
  return (
    <CountriesTabs.Navigator>
      <CountriesTabs.Screen
        options={{
          headerShown: false,
        }}
        name="Continents"
        component={ContinentsList}
      />
      <CountriesTabs.Screen
        options={{
          headerShown: false,
        }}
        name="Countries"
        component={CountriesList}
      />
    </CountriesTabs.Navigator>
  );
}
