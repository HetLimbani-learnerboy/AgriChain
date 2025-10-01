// ConsumerPage.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const ConsumerPage: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Consumer Portal</Text>
        <Text style={styles.subHeader}>
          Scan QR codes and track the complete supply chain of your produce.
        </Text>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png13_tv.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Traceability View</Text>
            <Text style={styles.cardText}>
              Crop → Farmer Details → Transport Info → Retail Price.
              {"\n"}Visualized as a timeline or flowchart for easy tracking.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png14_qv.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>QR Code Verification</Text>
            <Text style={styles.cardText}>
              Scan or view QR codes for product authentication and detailed info.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png15_st.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Sustainability Tips</Text>
            <Text style={styles.cardText}>
              Learn about eco-friendly practices and support sustainable agriculture.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConsumerPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfbf5" },
  content: { padding: 16 },
  header: { fontSize: 28, fontWeight: "700", color: "#166534", marginBottom: 8 },
  subHeader: { fontSize: 16, marginBottom: 16, color: "#333" },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "contain",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4, color: "#166534" },
  cardText: { fontSize: 14, color: "#333" },
});