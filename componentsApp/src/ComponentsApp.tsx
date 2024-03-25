import 'react-native-gesture-handler';

import {Navigator} from './presentation/navigator/Navigator';
import {ThemeProvider} from './presentation/context/ThemeContext';
import React from 'react';

export const ComponentsApp = () => {
  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
};
