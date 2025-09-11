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

const retailerActions: Action[] = [
  {
    title: "Received Produce",
    description: "View all produce received from distributors and check status.",
    icon: "checkmark-circle-outline",
    color: "#4CAF50",
  },
  {
    title: "Add Final Price & Stock",
    description: "Update stock quantities and set final selling price for each crop.",
    icon: "pricetag-outline",
    color: "#FF9800",
  },
  {
    title: "Generate QR Code",
    description: "Create QR codes for consumers to track products and verify authenticity.",
    icon: "qr-code-outline",
    color: "#2196F3",
  },
  {
    title: "Sales Overview",
    description: "Check sales performance and basic charts to analyze trends.",
    icon: "trending-up-outline",
    color: "#9C27B0",
  },
];

export default function RetailerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Retailer Dashboard</Text>
        <Text style={styles.subtitle}>Manage your stock, pricing, sales, and generate QR codes for consumers.</Text>

        <View style={styles.cardsContainer}>
          {retailerActions.map(({ title, description, icon, color }) => (
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