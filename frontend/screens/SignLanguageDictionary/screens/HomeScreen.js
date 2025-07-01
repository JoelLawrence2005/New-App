import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn</Text>
      <Text style={styles.subtitle}>Dictionary & Phrasebook</Text>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}  // Added style for the ScrollView itself
      >
        <View style={styles.grid}>
          {letters.map((letter) => (
            <TouchableOpacity
              key={letter}
              style={styles.button}
              onPress={() => navigation.navigate("Letter", { letter })}
            >
              <Text style={styles.buttonText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5", 
    alignItems: "center", 
    paddingTop: 30 
  },
  title: { 
    fontSize: 32, 
    fontWeight: "bold", 
    color: "#0A369D" 
  },
  subtitle: { 
    fontSize: 16, 
    color: "#555", 
    marginBottom: 20 
  },
  scrollView: {
    flex: 1,  // This makes the ScrollView take all available space
    width: '100%',  // Ensures full width
  },
  scrollContainer: { 
    flexGrow: 1,  // Allows content to expand vertically
    alignItems: "center", 
    paddingBottom: 40,  // Increased padding
    minHeight: '100%',  // Ensures minimum height
  },
  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "center", 
    width: "90%",
    paddingBottom: 40,  // Added padding at bottom
  },
  button: {
    backgroundColor: "#172937",
    padding: 20,
    margin: 8,
    borderRadius: 10,
    width: "25%",
    alignItems: "center",
  },
  buttonText: { 
    color: "#79dd09", 
    fontSize: 20, 
    fontWeight: "bold" 
  },
});

export default HomeScreen;