"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Platform  } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

function SubjectScreen({ route }) {
  const navigation = useNavigation()
  const { subjects } = route.params || { subjects: [] }
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSubjects = subjects.filter((subject) => subject.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Subjects</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Subjects..."
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Feather name="search" size={20} color="white" />
            </TouchableOpacity>
           
          </View>
 <TouchableOpacity style={styles.userButton}>
              <Feather name="user" size={24} color="white" />
            </TouchableOpacity>

          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject, index) => (
              <TouchableOpacity
                key={index}
                style={styles.subjectCard}
                onPress={() => navigation.navigate("Document", { subject })}
              >
                <Text style={styles.subjectTitle}>{subject.title}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noSubjectsText}>No subjects found.</Text>
          )}
        </ScrollView>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
            <Feather name="home" size={24} color="rgba(255,255,255,0.6)" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Feather name="book" size={24} color="white" />
            <Text style={[styles.navText, styles.navActive]}>Subjects</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Quizz")}>
            <Feather name="clipboard" size={24} color="rgba(255,255,255,0.6)" />
            <Text style={styles.navText}>Quizzes</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Quizz")}>
            <Feather name="clipboard" size={24} color="rgba(255,255,255,0.6)" />
            <Text style={styles.navText}>save</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({




  safeArea: {
    flex: 1,
    backgroundColor: "#171f36",
    paddingBottom: Platform.OS === "ios" ? 20 : 0
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272f47",
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    color: "white",
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  userButton: {
    padding: 10,
    marginLeft: 5,
  },
  subjectCard: {
    backgroundColor: "#272f47",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  subjectTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  noSubjectsText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    color: "white",
  },
})

export default SubjectScreen