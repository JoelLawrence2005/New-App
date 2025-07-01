
import React,{useContext}from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons"; // Ensure you have this installed
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from "../config/firebaseConfig";
import { signOut } from 'firebase/auth';

import { UserDetailContext } from '../Context/UserDetailContext';




const MenuScreen = ({ navigation }) => {
  
   const {userDetail,setUserDetail} = useContext(UserDetailContext);
   
   
  return (
    
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeBox}>
            
          <Text style={styles.welcomeText}>Welcome to Sign ශ්‍රී</Text>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Sign To Text")}
          >
            <FontAwesome5 name="hands" size={moderateScale(30)} color="#73E000" />
            <Text style={styles.cardTitle}>Sign to Text</Text>
            <Text style={styles.cardSubtitle}>Live Translation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Text To Sign")}
          >
            <FontAwesome5 name="comment-dots" size={moderateScale(30)} color="#73E000" />
            <Text style={styles.cardTitle}>Text to Sign</Text>
            <Text style={styles.cardSubtitle}>Animation Output</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Sign Language School")}
          >
            <FontAwesome5 name="graduation-cap" size={moderateScale(30)} color="#73E000" />
            <Text style={styles.cardTitle}>Sign Language School</Text>
            <Text style={styles.cardSubtitle}>Interactive Learning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Community Forum")}
          >
            <FontAwesome5 name="users" size={moderateScale(30)} color="#73E000" />
            <Text style={styles.cardTitle}>Community Forum</Text>
            <Text style={styles.cardSubtitle}>Discussions & Q&A</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    
  },
  welcomeBox: {
    backgroundColor: '#FFFFFF',
    padding: moderateScale(30),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(35),
    width: '85%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    logoutButton: {
        backgroundColor: "#d9534f", // Red button for sign out
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  welcomeText: {
    fontSize: moderateScale(20),
    color: '#172937',
    fontWeight: '500',
    letterSpacing: moderateScale(0.5),
    fontWeight: 'bold',

  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: scale(20),
    marginBottom: verticalScale(10),
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(20),
  },
  card: {
    width: scale(140),
    height: verticalScale(140),
    backgroundColor: "#172937",
    borderRadius: moderateScale(12),
    alignItems: "center",
    justifyContent: "center",
    padding: moderateScale(10),
  },
  cardTitle: {
    color: "#fff",
    fontSize: moderateScale(15),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: verticalScale(8),
    letterSpacing: moderateScale(0.5),
  },
  cardSubtitle: {
    color: "#B0B0B0",
    fontSize: moderateScale(13),
    textAlign: "center",
    marginTop: verticalScale(5),
    lineHeight: verticalScale(12),
    
  },

});

export default MenuScreen;
