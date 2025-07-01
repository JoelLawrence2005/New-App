import React from "react";
import { View, Text, TouchableOpacity, Pressable, StyleSheet, ScrollView } from "react-native";

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
        style={styles.scrollView}
      >
        <View style={styles.grid}>
          {letters.map((letter) => (
            <Pressable
              key={letter}
              onPress={() => navigation.navigate("Letter", { letter })}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed, // Add the pressed style here
              ]}
            >
              {/* Corrected line: changed 'style' to 'styles' */}
              <Text style={styles.buttonText}>{letter}</Text>
            </Pressable>
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
    paddingTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0A369D",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 40,
    minHeight: '100%',
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#172937",
    padding: 20,
    margin: 8,
    borderRadius: 10,
    width: "25%",
    alignItems: "center",
  },
  // Added the buttonPressed style for the translucent effect
  buttonPressed: {
    backgroundColor: "rgba(23, 41, 55, 0.7)", // Translucent version of original color
  },
  buttonText: {
    color: "#79dd09",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;