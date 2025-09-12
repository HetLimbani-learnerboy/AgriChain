<<<<<<< HEAD
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
=======
import React from "react";
import { View, Text, ScrollView, StyleSheet,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/MainLogo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Welcome to AgriChain 🔗</Text>
        <Text style={styles.subtitle}>Track the supply chain from farm to fork with transparency.</Text>

        <View style={styles.statsContainer}>
          {[
            { label: "Products", value: "1,428" },
            { label: "Batches", value: "76" },
            { label: "Stakeholders", value: "112" },
            { label: "Transactions", value: "5,890" },
          ].map(({ label, value }) => (
            <View key={label} style={styles.statCard}>
              <Text style={styles.statNumber}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7faf1" },
  content: { padding: 20, alignItems: "center" },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 120,
    width: 120,
    borderRadius: 60, // Use number instead of 50%
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#1E2B21", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#38423d", textAlign: "center", marginBottom: 30 },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  statCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: { fontSize: 24, fontWeight: "bold", color: "#269b59" },
  statLabel: { fontSize: 14, color: "#666", marginTop: 5 },
});
>>>>>>> main
