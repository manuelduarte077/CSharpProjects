import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CountriesList from './features/countries/screens/CountriesList';
import ContinentsList from './features/continents/screens/ContinentsList';
import ContinentDetail from './features/continents/screens/ContinentDetail';

type RootStackParamList = {
  MainTabs: undefined;
  ContinentDetail: {code: string; name: string};
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Continents"
        component={ContinentsList}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Countries"
        component={CountriesList}
      />
    </Tab.Navigator>
  );
}

export default function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContinentDetail"
        component={ContinentDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
