import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator, // For loading indicator
  Alert, // For showing alerts to the user
} from "react-native";
import { Video } from "expo-av";
import { videoData } from "../assets/data"; // Assuming this path is correct

const { width } = Dimensions.get('window');

const WordScreen = ({ route, navigation }) => {
  const { word = "" } = route.params || {}; // Ensure word is always a string and params is not null
  const videoRef = useRef(null);

  const [videoSource, setVideoSource] = useState(null);
  const [videoRate, setVideoRate] = useState(1);
  const [videoStatus, setVideoStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Track initial video loading
  const [error, setError] = useState(null); // Store any errors

  useEffect(() => {
    const fetchVideo = () => {
      setIsLoading(true);
      setError(null); // Clear previous errors

      if (!word) {
        console.warn("No word parameter provided for WordScreen.");
        setVideoSource(null);
        setIsLoading(false);
        setError("No word provided to display.");
        return;
      }

      let foundVideo = null;
      for (const letterKey in videoData) {
        if (Object.prototype.hasOwnProperty.call(videoData, letterKey)) {
          const letterVideos = videoData[letterKey];
          const videoEntry = letterVideos.find(
            (item) => item.word && item.word.toLowerCase() === word.toLowerCase()
          );
          if (videoEntry && videoEntry.video) {
            foundVideo = videoEntry.video;
            break;
          }
        }
      }

      if (foundVideo) {
        setVideoSource(foundVideo);
      } else {
        setVideoSource(null); // Explicitly null if not found
        setError(`No video found for the word "${word}".`);
      }
      setIsLoading(false);
    };

    fetchVideo();
  }, [word]);

  const handlePlaybackStatusUpdate = (status) => {
    setVideoStatus(status);
    if (status.isLoaded && isLoading) {
      setIsLoading(false); // Video is loaded, stop loading indicator
    }
    // Replay video when it ends, if it finished playing successfully
    if (status.didJustFinish && videoRef.current && !status.isBuffering && !status.error) {
      videoRef.current.replayAsync().catch(err => {
        console.error("Error replaying video:", err);
        setError("Failed to replay video.");
      });
    }
  };

  const handleVideoError = (errorInfo) => {
    console.error("Video playback error:", errorInfo);
    setError(`Video playback error: ${errorInfo.error}`);
    setIsLoading(false); // Stop loading on error
    // Optionally, reset video state or hide player
    if (videoRef.current) {
      videoRef.current.unloadAsync().catch(err => console.error("Error unloading video:", err));
    }
    setVideoSource(null); // Hide the video player on critical error
  };

  const slowDownVideo = async () => {
    if (!videoRef.current || !videoStatus.isLoaded) {
      Alert.alert("Video Not Ready", "Please wait for the video to load or play.");
      return;
    }
    const newRate = Math.max(videoRate - 0.25, 0.05);
    setVideoRate(newRate);
    try {
      await videoRef.current.setRateAsync(newRate, true);
    } catch (err) {
      console.error("Error setting video rate:", err);
      setError("Failed to change video speed.");
    }
  };

  const speedUp = async () => {
    if (!videoRef.current || !videoStatus.isLoaded) {
      Alert.alert("Video Not Ready", "Please wait for the video to load or play.");
      return;
    }
    setVideoRate(1);
    try {
      await videoRef.current.setRateAsync(1, true);
    } catch (err) {
      console.error("Error setting video rate:", err);
      setError("Failed to reset video speed.");
    }
  };

  const togglePlayPause = async () => {
    if (!videoRef.current || !videoStatus.isLoaded) {
      Alert.alert("Video Not Ready", "Please wait for the video to load.");
      return;
    }
    try {
      if (videoStatus.isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    } catch (err) {
      console.error("Error toggling play/pause:", err);
      setError("Failed to toggle video playback.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dictionary</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <View style={styles.container}>
        <Text style={styles.wordTitle}>{word}</Text>

        {isLoading ? (
          <View style={styles.videoPlaceholder}>
            <ActivityIndicator size="large" color="#00A896" />
            <Text style={styles.placeholderText}>Loading video...</Text>
          </View>
        ) : error ? (
          <View style={styles.videoPlaceholder}>
            <Text style={styles.errorText}>Error: {error}</Text>
            {/* Optional: Add a retry button for certain errors */}
            {/* <TouchableOpacity style={styles.retryButton} onPress={fetchVideo}>
              <Text style={styles.actionButtonText}>Retry</Text>
            </TouchableOpacity> */}
          </View>
        ) : videoSource ? (
          <View style={styles.videoCard}>
            <Video
              ref={videoRef}
              source={videoSource}
              style={styles.videoPlayer}
              useNativeControls={false}
              resizeMode="contain"
              isLooping={false} // Managed manually
              shouldPlay={true}
              rate={videoRate}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              onError={handleVideoError} // Catch video playback errors
            />
            {videoStatus.isLoaded && (
              <TouchableOpacity
                style={styles.playPauseButton}
                onPress={togglePlayPause}
              >
                <Text style={styles.playPauseText}>
                  {videoStatus.isPlaying ? "❚❚" : "▶"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.videoPlaceholder}>
            <Text style={styles.placeholderText}>No video available for "{word}".</Text>
          </View>
        )}

        <TouchableOpacity style={styles.actionButton} onPress={slowDownVideo}
           disabled={!videoStatus.isLoaded || isLoading}>
          <Text style={styles.actionButtonText}>Slow Down</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={speedUp}
           disabled={!videoStatus.isLoaded || isLoading}>
          <Text style={styles.actionButtonText}>Normal Speed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2C3E50",
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: 70,
  },
  headerButton: {
    padding: 5,
  },
  headerButtonText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  wordTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 30,
  },
  videoCard: {
    width: width * 0.85,
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: 'center',
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
  videoPlayer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  videoPlaceholder: {
    width: width * 0.85,
    aspectRatio: 1,
    backgroundColor: "#E0E0E0",
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
  errorText: {
    fontSize: 18,
    color: "#D32F2F", // A red color for errors
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: 'bold',
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
    width: width * 0.7,
    paddingVertical: 15,
    backgroundColor: "#00A896",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WordScreen;