import React, { useRef } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Animated } from "react-native";

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
            <AnimatedButton
              key={letter}
              onPress={() => navigation.navigate("Letter", { letter })}
              letter={letter}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// New AnimatedButton component to handle animations
const AnimatedButton = ({ onPress, letter }) => {
  // For scaling and text opacity (native driver compatible)
  const nativeAnimatedValue = useRef(new Animated.Value(0)).current; // Use a single value for native animations if they are in sync
  // For background color (JS driven)
  const jsAnimatedBgColor = useRef(new Animated.Value(0)).current;

  // Interpolate for scale and text opacity from a single nativeAnimatedValue
  const scaleInterpolate = nativeAnimatedValue.interpolate({
    inputRange: [0, 1], // 0 for normal, 1 for pressed
    outputRange: [1, 1.1], // Normal size to scaled up
  });

  const textOpacityInterpolate = nativeAnimatedValue.interpolate({
    inputRange: [0, 1], // 0 for normal, 1 for pressed
    outputRange: [1, 0.7], // Fully opaque to 70% opaque
  });

  // Interpolate the background color based on the JS animated value
  const backgroundColorInterpolate = jsAnimatedBgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#172937", "rgba(23, 41, 55, 0.7)"], // Original to translucent
  });

  const handlePressIn = () => {
    // Start native driver animations
    Animated.timing(nativeAnimatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    // Start JS driven background color animation
    Animated.timing(jsAnimatedBgColor, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    // Reset native driver animations
    Animated.timing(nativeAnimatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    // Reset JS driven background color animation
    Animated.timing(jsAnimatedBgColor, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.buttonWrapper}
    >
      {/* This Animated.View handles the background color (JS-driven) */}
      <Animated.View
        style={[
          styles.buttonInner,
          {
            backgroundColor: backgroundColorInterpolate, // Only JS-driven properties here
          },
        ]}
      >
        {/* This Animated.View handles the scale transform (Native-driven) */}
        <Animated.View
          style={{
            flex: 1, // To make it fill the parent
            width: '100%', // To make it fill the parent
            height: '100%', // To make it fill the parent
            alignItems: 'center', // Center content
            justifyContent: 'center', // Center content
            transform: [{ scale: scaleInterpolate }], // Only Native-driven properties here
          }}
        >
          {/* Animated.Text for opacity (Native-driven) */}
          <Animated.Text
            style={[
              styles.buttonText,
              { opacity: textOpacityInterpolate }, // Only Native-driven properties here
            ]}
          >
            {letter}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
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
  buttonWrapper: {
    margin: 8,
    width: "25%",
    aspectRatio: 1,
  },
  buttonInner: {
    flex: 1,
    // Removed backgroundColor from here, it's handled by interpolation
    borderRadius: 10,
    overflow: 'hidden', // Crucial to clip the inner scaled view if it scales beyond bounds
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#79dd09",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;