import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import MenuScreen from '../MenuScreen';
import SignToTextScreen from '../SignToText/SignToTextScreen';
import TextToSignScreen from '../TextToSign/TextToSignScreen';
import SchoolScreen from '../SignLanguageSchool/SignLanguageSchoolScreen';
import ForumScreen from '../CommunityForum/ForumScreen';
import CreatePostScreen from '../CommunityForum/CreatePostScreen';
import PostDetailScreen from '../CommunityForum/PostDetailScreen';
import LessonScreen from './../SignLanguageSchool/LessonScreen';
import ProgressScreen from './../SignLanguageSchool/ProgressScreen';
import QuizScreen from './../SignLanguageSchool/QuizScreen';

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
      <Stack.Screen name="Sign To Text" component={SignToTextScreen} />
      <Stack.Screen name="Text To Sign" component={TextToSignScreen} />
      <Stack.Screen name="Sign Language School" component={SchoolScreen} />
      <Stack.Screen name="Community Forum" component={ForumScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      
      <Stack.Screen name="Lesson Screen" component={LessonScreen} />
      <Stack.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{
          gestureEnabled: false, // Disable swipe back gesture 
          headerLeft: () => null, // Hide the back button in the header 
        }}
      />
      <Stack.Screen 
        name="Quiz" 
        component={QuizScreen} 
        options={{
          gestureEnabled: false, // Disable swipe back gesture 
          
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;