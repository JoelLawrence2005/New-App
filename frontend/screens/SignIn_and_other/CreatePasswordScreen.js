import React, { useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';

export default function CreatePasswordScreen({ navigation }) {
    const [newpassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000000" />
                  </TouchableOpacity>
            <Text style={styles.title}>Create New Password</Text>

            <Image source={require('../../assets/SignIn_and_other_Images/createPassword.jpg')} style={styles.illustration} />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    backButton: { 
        alignSelf: 'flex-start',
        marginBottom: 20,
      },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF',
        marginTop: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E3D59',
        marginBottom: 32,
    },
    illustration: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 32,
    },
    input: {
        height: 56,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    createButton: {
        height: 56,
        backgroundColor: '#1E3D59',
        borderRadius: 12,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});     