"use client"

import { useState } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Calendar } from "react-native-calendars"
import NavBar from "../components/Navbar"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

// Event Data
const events = [
  {
    id: "1",
    title: "AI Hackathon 2025",
    date: "2025-03-15",
    type: "Hackathon",
    description: "Join the ultimate AI challenge and showcase your skills.",
  },
  {
    id: "2",
    title: "Summer Internship at Google",
    date: "2025-06-01",
    type: "Internship",
    description: "A great opportunity to work with Google engineers.",
  },
  {
    id: "3",
    title: "Web Development Bootcamp",
    date: "2025-04-10",
    type: "Training",
    description: "Learn full-stack web development with hands-on projects.",
  },
  {
    id: "4",
    title: "Cybersecurity Workshop",
    date: "2025-03-28",
    type: "Workshop",
    description: "Learn ethical hacking and security best practices.",
  },
]

// Function to get icons based on event type
const getIcon = (type) => {
  switch (type) {
    case "Hackathon":
      return "code"
    case "Internship":
      return "briefcase"
    case "Training":
      return "book"
    case "Workshop":
      return "shield"
    default:
      return "calendar"
  }
}

// Events Screen Component
const EventsScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={["top", "right", "left"]}>
        <View style={styles.container}>
          <Text style={styles.header}>Upcoming Events</Text>

          <Calendar
  onDayPress={(day) => setSelectedDate(day.dateString)}
  markedDates={{
    ...events.reduce((acc, event) => {
      acc[event.date] = { marked: true, dotColor: "#FF6347" } // Tomato Red for event dates
      return acc
    }, {}),
    [selectedDate]: { selected: true, marked: true, selectedColor: "#6C63FF" } // Primary Purple for selected date
  }}
  theme={{
              selectedDayBackgroundColor: "#6C63FF", // Primary Purple
              arrowColor: "#6C63FF", // Primary Purple
              monthTextColor: "#E6E6FA", // Light Lavender
              textSectionTitleColor: "#D8BFD8", // Light Lilac
              calendarBackground: "#171f36", // Dark Blue Background
              dayTextColor: "#E6E6FA", // Light Lavender
              todayTextColor: "red", // Make today's text red
            }}
/>


          <FlatList
            data={events.filter((event) => !selectedDate || event.date === selectedDate)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Feather name={getIcon(item.type)} size={24} color="#6C63FF" style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* NavBar is placed here to ensure it's always visible */}
        <NavBar navigation={navigation} />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

// Styles (Updated to match LearningAppHome and fix safe area issues)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171f36",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 100, // Extra padding at the bottom for NavBar
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#E6E6FA",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#272f47", // Dark Purple
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  icon: { marginRight: 15 },
  textContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: "bold", color: "#E6E6FA" }, // Light Lavender
  date: { fontSize: 14, color: "#D8BFD8", marginVertical: 3 }, // Light Lilac
  description: { fontSize: 14, color: "#6C63FF" }, // Primary Purple
})

export default EventsScreen

