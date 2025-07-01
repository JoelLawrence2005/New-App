import { sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig"; // Ensure Firestore is imported

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onResetPassword = async () => {
    if (!email) {
      ToastAndroid.show("Please enter your email", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      // **Step 1: Check if the email exists in Firestore**
      const usersRef = collection(db, "users"); // Reference to users collection
      const q = query(usersRef, where("email", "==", email)); // Query Firestore
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Email not found in Firestore
        setLoading(false);
        ToastAndroid.show("Email not registered!", ToastAndroid.LONG);
        return;
      }

      // **Step 2: If email exists, send reset email**
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      ToastAndroid.show(
        "Password reset email sent. Check your inbox.",
        ToastAndroid.LONG
      );
      navigation.goBack(); // Navigate back to Sign In screen
    } catch (error) {
      setLoading(false);
      ToastAndroid.show("Error: " + error.message, ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.resetButton}
        onPress={onResetPassword}
        disabled={loading}
      >
        {!loading ? (
          <Text style={styles.buttonText}>Send Reset Email</Text>
        ) : (
          <ActivityIndicator size="small" color="#FFFFFF" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3D59",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1, // Optional: Gives a light border
    borderColor: '#E0E0E0',
    borderRadius: 50, // Matches existing style

  },
  resetButton: {
    height: 50,
    backgroundColor: "#1E3D59",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backText: {
    textAlign: "center",
    color: "#1E3D59",
    fontSize: 14,
    
    
  },
});
