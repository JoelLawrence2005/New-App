import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';

export default function PasswordChangedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Image 
            source={require('../../assets/SignIn_and_other_Images/confirm.jpg')}
            style={styles.checkIcon}
          />
        </View>
        
        <Text style={styles.title}>Password Changed</Text>
        <Text style={styles.description}>
          Password successfully changed. You can now log in with your new password.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  backButton: { 
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E3D59',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkIcon: {
    width: 40,
    height: 40,
    tintColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3D59',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});