import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/Navbar";

const LearningpathScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "right", "left"]}>
        <View style={styles.content}>
          <Text style={styles.text}>Learning Path Screen</Text>
        </View>
      </SafeAreaView>
      
      {/* NavBar outside of SafeAreaView to ensure it's at the bottom */}
      <View style={styles.navBarContainer}>
        <NavBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171f36", 
    position: "relative", 
  },
  safeArea: {
    flex: 1, 
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60, 
  },
  text: {
    color: "white", 
    fontSize: 18,
    fontWeight: "bold",
  },
  navBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  
  }
});

export default LearningpathScreen;