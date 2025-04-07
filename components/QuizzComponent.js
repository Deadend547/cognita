import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, StatusBar, SafeAreaView, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import NavBar from "../components/Navbar"
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

export default function QuizzComponent() {
  const navigation = useNavigation();
  const [savedItems, setSavedItems] = useState([]);

  // Load saved items when component mounts
  useEffect(() => {
    const loadSavedItems = async () => {
      try {
        const savedData = await AsyncStorage.getItem("savedItems");
        if (savedData) {
          setSavedItems(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error loading saved items:", error);
      }
    };
    
    loadSavedItems();
  }, []);

  // Save items to AsyncStorage whenever savedItems changes
  useEffect(() => {
    const saveToStorage = async () => {
      try {
        await AsyncStorage.setItem("savedItems", JSON.stringify(savedItems));
      } catch (error) {
        console.error("Error saving items:", error);
      }
    };
    
    saveToStorage();
  }, [savedItems]);

  // Check if an item is saved
  const isItemSaved = (title) => {
    return savedItems.some(item => item.title === title);
  };

  // Toggle save status for an item
  const toggleSaveItem = (title, description, icon) => {
    if (isItemSaved(title)) {
      // Remove from saved items
      setSavedItems(savedItems.filter(item => item.title !== title));
      Alert.alert("Removed", `${title} removed from saved items`);
    } else {
      // Add to saved items
      setSavedItems([...savedItems, { title, description, icon }]);
      Alert.alert("Saved", `${title} saved successfully`);
    }
  };

  // Navigate to topic-specific quizzes
  const navigateToTopicQuizzes = (title) => {
    // You'll need to create this screen in your screens folder
    navigation.navigate("TopicQuizzes", { 
      topic: title,
      // You can pass additional data if needed
    });
  };

  return (
    <LinearGradient colors={["#0b1023", "#1f2b49"]} style={styles.container} start={[0, 0]} end={[1, 1]}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for quizzes, topics, or keywords..."
              placeholderTextColor="rgba(255,255,255,0.6)"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Feather name="search" size={16} color="white" />
            </TouchableOpacity>


            <TouchableOpacity 
              style={styles.userButton}
              onPress={() => navigation.navigate("profile")}
            >
              <Feather name="profile" size={24} color="white" />
            </TouchableOpacity>

      
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Subjects</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Top Picks</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
            <CategoryCard
              title="Programming"
              description="Test your coding skills across multiple languages and frameworks."
              icon="code-tags"
              quizCount={156}
              difficulty={2}
              featured={true}
              isSaved={isItemSaved("Programming")}
              onSave={() => toggleSaveItem("Programming", "Test your coding skills across multiple languages and frameworks.", "code-tags")}
              onPress={() => navigateToTopicQuizzes("Programming")}
            />
            <CategoryCard
              title="Databases"
              description="Learn about SQL, NoSQL, and database design principles."
              icon="database"
              quizCount={89}
              difficulty={3}
              isSaved={isItemSaved("Databases")}
              onSave={() => toggleSaveItem("Databases", "Learn about SQL, NoSQL, and database design principles.", "database")}
              onPress={() => navigateToTopicQuizzes("Databases")}
            />
            <CategoryCard
              title="Web Development"
              description="HTML, CSS, JavaScript and modern frameworks."
              icon="web"
              quizCount={112}
              difficulty={1}
              isNew={true}
              isSaved={isItemSaved("Web Development")}
              onSave={() => toggleSaveItem("Web Development", "HTML, CSS, JavaScript and modern frameworks.", "web")}
              onPress={() => navigateToTopicQuizzes("Web Development")}
            />
            <CategoryCard
              title="Machine Learning"
              description="AI, neural networks, and data science fundamentals."
              icon="brain"
              quizCount={78}
              difficulty={3}
              isSaved={isItemSaved("Machine Learning")}
              onSave={() => toggleSaveItem("Machine Learning", "AI, neural networks, and data science fundamentals.", "brain")}
              onPress={() => navigateToTopicQuizzes("Machine Learning")}
            />
          </ScrollView>

          <CategorySection
            title="Computer Science"
            categories={[
              {
                title: "Programming",
                description: "Multiple languages and paradigms.",
                icon: "code-tags",
                quizCount: 156,
                difficulty: 2,
                isSaved: isItemSaved("Programming"),
                onSave: () => toggleSaveItem("Programming", "Multiple languages and paradigms.", "code-tags"),
                onPress: () => navigateToTopicQuizzes("Programming")
              },
              {
                title: "Databases",
                description: "SQL and NoSQL systems.",
                icon: "database",
                quizCount: 89,
                difficulty: 3,
                isSaved: isItemSaved("Databases"),
                onSave: () => toggleSaveItem("Databases", "SQL and NoSQL systems.", "database"),
                onPress: () => navigateToTopicQuizzes("Databases")
              },
              {
                title: "Algorithms",
                description: "Sorting, searching, and optimization.",
                icon: "chevron-right",
                quizCount: 64,
                difficulty: 2,
                isSaved: isItemSaved("Algorithms"),
                onSave: () => toggleSaveItem("Algorithms", "Sorting, searching, and optimization.", "chevron-right"),
                onPress: () => navigateToTopicQuizzes("Algorithms")
              },
            ]}
          />

          {/* Other CategorySection components with similar modifications */}
          
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
      <View style={styles.navBarContainer}>
        <NavBar />
      </View>
    </LinearGradient>
  )
}

function CategoryCard({ 
  title, 
  description, 
  icon, 
  quizCount, 
  difficulty, 
  featured, 
  isNew, 
  isSaved, 
  onSave, 
  onPress 
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.badgeText}>Featured</Text>
        </View>
      )}
      {isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.badgeText}>New</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIcon}>
            <MaterialCommunityIcons name={icon} size={24} color="white" />
          </View>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={(e) => {
              e.stopPropagation();
              onSave();
            }}
          >
            <Feather 
              name="bookmark" 
              size={20} 
              color={isSaved ? "#6c5ce7" : "white"} 
              style={isSaved ? styles.savedIcon : {}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.quizCount}>{quizCount} quizzes</Text>
          <View style={styles.difficulty}>
            {[1, 2, 3].map((dot) => (
              <View key={dot} style={[styles.difficultyDot, dot <= difficulty && styles.difficultyActive]} />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function CategorySection({ title, categories }) {
  return (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <View style={styles.cardGrid}>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            description={category.description}
            icon={category.icon}
            quizCount={category.quizCount}
            difficulty={category.difficulty}
            isSaved={category.isSaved}
            onSave={category.onSave}
            onPress={category.onPress}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // ... existing styles ...
  
  // Add these new styles
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  saveButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
  },
  savedIcon: {
    opacity: 1,
  },
  
  // Keep all your existing styles below
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },

  scrollView: {
    flex: 1,
    padding: 15,
    marginTop: -10,
  },
  searchContainer: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: "white",
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
  },
  userButton: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    marginLeft: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
  badge: {
    backgroundColor: "#6c5ce7",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  cardScroll: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 15,
    width: 250,
    marginRight: 15,
    position: "relative",
    marginBottom: 15,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContent: {
    padding: 15,
  },
  cardIcon: {
    backgroundColor: "rgba(255,255,255,0.1)",
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  cardDescription: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quizCount: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
  difficulty: {
    flexDirection: "row",
    gap: 4,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginLeft: 2,
  },
  difficultyActive: {
    backgroundColor: "#6c5ce7",
  },
  featuredBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ff7675",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  newBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#00b894",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  categorySection: {
    marginVertical: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.9)",
    marginBottom: 15,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
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
  
  navBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingBottom: 0,
  },
})