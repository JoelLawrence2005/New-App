

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { UserDetailContext } from './Context/UserDetailContext';

// Import Screens
import SplashScreen from './screens/SignIn_and_other/SplashScreen';
import SignInScreen from './screens/SignIn_and_other/SignInScreen';
import SignUpScreen from './screens/SignIn_and_other/SignUpScreen';
import ForgotPasswordScreen from './screens/SignIn_and_other/ForgotPasswordScreen';
import VerifyEmailScreen from './screens/SignIn_and_other/VerifyEmailScreen';
import CreatePasswordScreen from './screens/SignIn_and_other/CreatePasswordScreen';
import PasswordChangedScreen from './screens/SignIn_and_other/PasswordChangedScreen';

import BottomTabNavigator from './screens/Navigation/BottomTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  const [userDetail, setUserDetail] = useState("");

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#FFFFFF' }
            }}
          >
            {/* Authentication Flow */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
            <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
            <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />

            {/* Main App Flow */}
            <Stack.Screen name="Main" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserDetailContext.Provider>
  );
}
