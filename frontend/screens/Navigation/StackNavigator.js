import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import BottomTabNavigator from './BottomTabNavigator'; // Import the BottomTabNavigator

const StackNavigator = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default StackNavigator;