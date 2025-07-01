import { View, Text } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LetterScreen from "./screens/LetterScreen";
import WordScreen from "./screens/WordScreen";

const Stack = createStackNavigator();

const SignLanguageDictionaryScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Letter" component={LetterScreen} />
        <Stack.Screen name="Word" component={WordScreen} />
    </Stack.Navigator>
  )
}

export default SignLanguageDictionaryScreen