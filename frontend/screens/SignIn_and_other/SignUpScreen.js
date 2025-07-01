import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../Context/UserDetailContext';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const [secureTextPassword, setSecureTextPassword] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Error', 'Invalid email format');
      return false;
    }

    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Phone number must be at least 10 digits');
      return false;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      await saveUserData(user);
      await auth.signOut();

      Alert.alert(
        'Verify Email',
        'A verification email has been sent. Please verify your email before signing in.',
        [{ text: 'OK', onPress: () => navigation.replace('SignIn') }]
      );
    } catch (error) {
      handleSignUpError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserData = async (user) => {
    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      member: false,
      uid: user.uid,
      emailVerified: user.emailVerified
    };
    
    await setDoc(doc(db, 'users', user.uid), userData);
    setUserDetail(userData);
  };

  const handleSignUpError = (error) => {
    let message = 'Registration failed. Please try again.';
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Email already in use';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 8 characters';
        break;
    }
    Alert.alert('Error', message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextPassword}
          />
          <TouchableOpacity
            onPress={() => setSecureTextPassword(!secureTextPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons name={secureTextPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureTextConfirm}
          />
          <TouchableOpacity
            onPress={() => setSecureTextConfirm(!secureTextConfirm)}
            style={styles.eyeIcon}
          >
            <Ionicons name={secureTextConfirm ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3D59',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    height: 56,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  eyeIcon: {
    padding: 12,
    position: 'absolute',
    right: 16,
  },
  signUpButton: {
    height: 56,
    backgroundColor: '#1E3D59',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: 24,
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
  },
  signInText: {
    color: '#1E3D59',
    fontSize: 14,
    fontWeight: 'bold',
  },
});