import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Video } from "expo-av";
import { videoData } from "../assets/data"; // Assuming this path is correct

const { width } = Dimensions.get('window');

const WordScreen = ({ route, navigation }) => {
  const { word = "" } = route.params;
  const videoRef = useRef(null);
  const [videoSource, setVideoSource] = useState(null);
  const [videoRate, setVideoRate] = useState(1);
  const [videoStatus, setVideoStatus] = useState({}); // To manage video playback status

  useEffect(() => {
    if (!word) {
      console.warn("No word parameter provided");
      return;
    }

    let foundVideo = null;
    for (const letter in videoData) {
      const videoEntry = videoData[letter].find(
        (item) => item.word && word && item.word.toLowerCase() === word.toLowerCase()
      );
      if (videoEntry && videoEntry.video) {
        foundVideo = videoEntry.video;
        break;
      }
    }
    setVideoSource(foundVideo);
  }, [word]);

  const handlePlaybackStatusUpdate = (status) => {
    setVideoStatus(status);
  };

  const slowDownVideo = async () => {
    const newRate = Math.max(videoRate - 0.25, 0.05);
    setVideoRate(newRate);
    if (videoRef.current) {
      await videoRef.current.setRateAsync(newRate, true);
    }
  };

  const speedUp = async () => {
    setVideoRate(1);
    if (videoRef.current) {
      await videoRef.current.setRateAsync(1, true);
    }
  };

  // Replay video when it ends
  useEffect(() => {
    if (videoStatus.didJustFinish && videoRef.current) {
      videoRef.current.replayAsync();
    }
  }, [videoStatus]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dictionary</Text>
        <View style={{ width: 40 }} /> {/* Spacer to balance title */}
      </View>

      <View style={styles.container}>
        <Text style={styles.wordTitle}>{word}</Text>

        {videoSource ? (
          <View style={styles.videoCard}>
            <Video
              // ... props
            />
             {/* Custom Play/Pause button if native controls are off */}
             {!videoStatus.isPlaying && videoStatus.isLoaded && (
              <TouchableOpacity
                style={styles.playPauseButton}
                onPress={() => videoRef.current?.playAsync()}
              >
                <Text style={styles.playPauseText}>▶</Text>
              </TouchableOpacity>
            )}
            {videoStatus.isPlaying && videoStatus.isLoaded && (
              <TouchableOpacity
                style={styles.playPauseButton}
                onPress={() => videoRef.current?.pauseAsync()}
              >
                <Text style={styles.playPauseText}>❚❚</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.videoPlaceholder}>
            <Text style={styles.placeholderText}>Video not available for "{word}"</Text>
          </View>
        )}

        <TouchableOpacity style={styles.actionButton} onPress={slowDownVideo}>
          <Text style={styles.actionButtonText}>Slow Down</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={speedUp}>
          <Text style={styles.actionButtonText}>Normal Speed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light background for the entire screen
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2C3E50", // Darker header background
    paddingHorizontal: 15,
    paddingVertical: 15, // Adjust padding as needed
    height: 70, // Fixed height for header
  },
  headerButton: {
    padding: 5,
  },
  headerButtonText: {
    fontSize: 28,
    color: "#FFFFFF", // White color for back arrow
    fontWeight: '300', // Lighter weight for the arrow
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF", // White color for title
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20, // Consistent horizontal padding
    paddingTop: 30, // Space from header
  },
  wordTitle: {
    fontSize: 48, // Larger font for the word
    fontWeight: "bold",
    color: "#333333", // Darker text for readability
    marginBottom: 30, // More space below the word
  },
  videoCard: {
    width: width * 0.85, // Responsive width
    aspectRatio: 1, // Makes it square
    backgroundColor: "#FFFFFF", // White background for the card
    borderRadius: 20,
    overflow: "hidden", // Ensure video content respects border radius
    justifyContent: 'center', // Center content if video doesn't fill
    alignItems: 'center', // Center content if video doesn't fill
    marginBottom: 40, // Space below video card
    // Subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8, // Android shadow
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    borderRadius: 20, // Match card border radius
  },
  videoPlaceholder: {
    width: width * 0.85,
    aspectRatio: 1,
    backgroundColor: "#E0E0E0", // Gray background for placeholder
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  placeholderText: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  playPauseButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    padding: 15,
  },
  playPauseText: {
    color: 'white',
    fontSize: 30,
  },
  actionButton: {
    width: width * 0.7, // Wider buttons
    paddingVertical: 15,
    backgroundColor: "#00A896", // Teal background
    borderRadius: 30, // More rounded corners
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // Space between buttons
    // Button shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  actionButtonText: {
    color: "#FFFFFF", // White text for contrast
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WordScreen;