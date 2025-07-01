import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid, ActivityIndicator, Alert } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../Context/UserDetailContext';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const onSignInClick = async () => {
    if (!email || !password) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          'Email Not Verified',
          'Please verify your email address before signing in. Check your inbox for the verification email.',
          [
            {
              text: 'Resend Email',
              onPress: () => sendVerificationEmail(user),
            },
            { text: 'OK', onPress: () => {} },
          ]
        );
        await auth.signOut();
        return;
      }

      await getUserDetail(user.uid);
      navigation.replace('Main');
    } catch (error) {
      handleSignInError(error);
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      ToastAndroid.show('Verification email resent!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Error sending verification email', ToastAndroid.SHORT);
    }
  };

  const handleSignInError = (error) => {
    let message = 'Incorrect email & password';
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'User not found';
        break;
      case 'auth/wrong-password':
        message = 'Invalid password';
        break;
      case 'auth/too-many-requests':
        message = 'Too many attempts. Try again later';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email format';
        break;
      case 'auth/user-disabled':
        message = 'Account has been disabled';
        break;
    }
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const getUserDetail = async (uid) => {
    try {
      const result = await getDoc(doc(db, 'users', uid));
      setUserDetail(result.data());
    } catch (error) {
      ToastAndroid.show('Error loading user data', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={(value) => setEmail(value)}  
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
        />
      
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={secureText}
            value={password}
          />
          <TouchableOpacity 
            onPress={() => setSecureText(!secureText)} 
            style={styles.eyeIcon}
          >
            <Ionicons name={secureText ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={onSignInClick}
        disabled={loading}
      >
        {!loading ? (
          <Text style={styles.buttonText}>Sign In</Text>
        ) : (
          <ActivityIndicator size={"large"} color="white"/>
        )}
      </TouchableOpacity>

      {/*<Text style={styles.orText}>Or</Text>*/}
      {/*<View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image 
            source={require('../../assets/SignIn_and_other_Images/google_icon.jpg')} 
            style={styles.socialIcon} 
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
      */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#1E3D59',
    fontSize: 14,
  },
  signInButton: {
    height: 56,
    backgroundColor: '#1E3D59',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 24,
  },
  socialButtons: {
    gap: 16,
  },
  socialButton: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 50,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#1E3D59',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 24,
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
  },
  signUpText: {
    color: '#1E3D59',
    fontSize: 14,
    fontWeight: 'bold',
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
});