import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FontLoader from './src/components/FontLoader';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <FontLoader>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </FontLoader>
    </SafeAreaProvider>
  );
}