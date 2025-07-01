import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import MenuScreen from '../MenuScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#172937',
          borderBottomRightRadius: scale(100),
          height: verticalScale(120),
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          letterSpacing: moderateScale(1),
          fontSize: moderateScale(22),
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={MenuScreen} 
        options={{ 
          title: 'Home',
          headerLeft: () => null, // Hide the back button in the header
        }} 
      />
    
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;