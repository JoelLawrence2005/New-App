import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.navText}>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.navText}>🔍</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.navText}>🎮</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#0A369D",
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navText: { color: "white", fontSize: 24 },
});

export default NavBar;
