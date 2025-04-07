// Updated NavBar.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function NavBar() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
          <Feather name="home" size={24} color="white" />
          <Text style={[styles.navText, styles.navActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Explore")}>
          <Feather name="compass" size={24} color="rgba(255,255,255,0.6)" />
          <Text style={styles.navText}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate("SavedItems")}
        >
          <Feather name="bookmark" size={24} color="rgba(255,255,255,0.6)" />
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate("Progress")}
        >
          <Feather name="award" size={24} color="rgba(255,255,255,0.6)" />
          <Text style={styles.navText}>Progress</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#10162a",
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#10162a",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    marginTop: 5,
  },
  navActive: {
    color: "#ffffff",
  },
});

export default NavBar;