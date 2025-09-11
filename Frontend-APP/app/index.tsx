import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
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