import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBASuMGclC4I1QwbA1YdjshRopD7Ih2fKs",
  authDomain: "sign-sri-123.firebaseapp.com",
  projectId: "sign-sri-123",
  storageBucket: "sign-sri-123.appspot.com",
  messagingSenderId: "955746453795",
  appId: "1:955746453795:web:e07d124448e599bb3aa496",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
