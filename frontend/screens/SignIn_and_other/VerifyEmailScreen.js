import React , { useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';

export default function VerifyEmailScreen({ navigation }) {
    const [code , setCode] = useState(['','', '','']);
    const handleCodeChange = (text, value) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 3) {
            inputRefs[index + 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000000" />
                  </TouchableOpacity>
            <Text style={styles.title}>Verify Your Email</Text>

            <Image source={require('../../assets/SignIn_and_other_Images/verify.jpg')} style={styles.illustration} />

            <Text style={styles.description}>
                Please Enter The 4 Digit Verification Code Sent To  {'\n'} example123@gmail.com
            </Text>

            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.codeInput}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={digit}
                        onChangeText={text => handleCodeChange(text, index)}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={() => navigation.navigate('CreateNewPassword')}>
                <Text style={styles.buttonText}Verify>Verify</Text>
            </TouchableOpacity>
        </View>
    );
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF',
        marginTop: 32,
       
    },
    backButton: { 
        alignSelf: 'flex-start',
        marginBottom: 20,
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
    description: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    codeInput: {
        height: 56,
        width: 56,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 24,
    },
    verifyButton: {
        height: 56,
        backgroundColor: '#1E3D59',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});