import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Action = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

const farmerActions: Action[] = [
  {
    title: "Add Produce",
    description: "Add new crops with details like crop name, quantity, price, grade, and location.",
    icon: "add-circle-outline",
    color: "#4CAF50",
  },
  {
    title: "My Produce List",
    description: "Track the status of your crops from Added → Transported → Sold.",
    icon: "list-outline",
    color: "#2196F3",
  },
  {
    title: "Earnings Overview",
    description: "View your total earnings, recent transactions, and profit summary.",
    icon: "trending-up-outline",
    color: "#FF9800",
  },
  {
    title: "Market Prices",
    description: "Stay updated with the latest market rates and pricing trends for different crops.",
    icon: "analytics-outline",
    color: "#9C27B0",
  },
];

export default function FarmerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Farmer Dashboard</Text>
        <Text style={styles.subtitle}>Manage your crops, earnings, and market insights.</Text>

        <View style={styles.cardsContainer}>
          {farmerActions.map(({ title, description, icon, color }) => (
            <TouchableOpacity key={title} style={styles.actionCard}>
              <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
                <Ionicons name={icon} size={40} color={color} />
              </View>
              <Text style={styles.actionTitle}>{title}</Text>
              <Text style={styles.actionDescription}>{description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7faf1" },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1E2B21", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#38423d", textAlign: "center", marginBottom: 30 },
  cardsContainer: { gap: 15 },
  actionCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", marginBottom: 15 },
  actionTitle: { fontSize: 18, fontWeight: "bold", color: "#1E2B21", marginBottom: 8 },
  actionDescription: { fontSize: 14, color: "#666", lineHeight: 20 },
});
