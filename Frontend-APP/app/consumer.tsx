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

const consumerActions: Action[] = [
  {
    title: "Traceability View",
    description: "Crop → Farmer Details → Transport Info → Retail Price. Visualized as a timeline or flowchart for easy tracking.",
    icon: "git-network-outline",
    color: "#4CAF50",
  },
  {
    title: "QR Code Verification",
    description: "Scan or view QR codes for product authentication and detailed info.",
    icon: "scan-outline",
    color: "#2196F3",
  },
  {
    title: "Sustainability Tips",
    description: "Learn about eco-friendly practices and support sustainable agriculture.",
    icon: "leaf-outline",
    color: "#8BC34A",
  },
];

export default function ConsumerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Consumer Portal</Text>
        <Text style={styles.subtitle}>Scan QR codes and track the complete supply chain of your produce.</Text>

        <View style={styles.cardsContainer}>
          {consumerActions.map(({ title, description, icon, color }) => (
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
