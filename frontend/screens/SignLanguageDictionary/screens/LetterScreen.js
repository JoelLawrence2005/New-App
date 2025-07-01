import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { videoData } from "../assets/data";

const LetterScreen = ({ route, navigation }) => {
  const { letter } = route.params;
  const words = videoData[letter] || [];

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.letter}>{letter}</Text>
      

      {words.length === 0 ? (
        <Text style={styles.noWordsText}>No words for this letter yet.</Text>
      ) : (
        words
          .filter((item) => item?.word) // Letters which do not have words, the word list is skipped, without showing any errors (error handling)
          .map((item) => (
            <TouchableOpacity
              key={item.word}
              style={styles.wordButton}
              onPress={() => navigation.navigate("Word", { word: item.word, video: item.video })}
            >
              <Text style={styles.wordText}>{item.word}</Text>
            </TouchableOpacity>
          ))
      )}
    </ScrollView>
  );
};


const AlphabetList = ({ navigation }) => {
  const letters = Object.keys(videoData);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {letters.map((letter) => (
        <TouchableOpacity
          key={letter}
          style={styles.letterButton}
          onPress={() => navigation.navigate("LetterScreen", { letter })}
        >
          <Text style={styles.letterButtonText}>{letter}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 90, // Extra padding at the bottom to allow better scrolling
  },
  backButton: { position: "absolute", top: 40, left: 20 },
  backText: { fontSize: 30, color: "white" },
  letter: { fontSize: 50, fontWeight: "bold", color: "#172937", marginBottom: 20 },
  noWordsText: {
    fontSize: 20,
    color: "white",
    marginTop: 20,
    fontStyle: "italic",
  },
  wordButton: {
    backgroundColor: "#172937",
    padding: 15,
    marginVertical: 8,
    borderRadius: 50,
    width: 200,
    alignItems: "center",
  },
  wordText: { color: "#79dd09", fontSize: 20, fontWeight: "bold" },
  letterButton: {
    backgroundColor: "#79dd09",
    padding: 15,
    marginVertical: 8,
    borderRadius: 20,
    width: 100,
    alignItems: "center",
  },
  letterButtonText: { color: "#172937", fontSize: 20, fontWeight: "bold" },
});

export default  LetterScreen;
