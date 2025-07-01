import React, { useContext, useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig"; // Ensure `db` is imported
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../Context/UserDetailContext";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserDetail(userDoc.data());

          }
          navigation.replace("Main"); // Use `replace` to prevent going back to Splash
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigation.replace("SignIn");
        }
      } else {
        setTimeout(() => {
          navigation.replace("SignIn");
        }, 2000);
      }
    });

    return () => unsubscribe(); // Cleanup the listener when unmounting
  }, []);

  return (
    <View style={styles.container}>
      {/* App Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/SignIn_and_other_Images/logo.jpg")}
          style={styles.icon}
        />
      </View>

      {/* Loader */}
      <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#172937",
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    alignItems: "center",
    marginBottom: 10,
  },
  loader: {
    marginTop: 10,
  },
});

export default SplashScreen;
