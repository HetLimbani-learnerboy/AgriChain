// RetailerPage.tsx
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

const RetailerPage: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Retailer Dashboard</Text>
        <Text style={styles.subHeader}>
          Manage your stock, pricing, sales, and generate QR codes for consumers.
        </Text>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png9_rp.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Received Produce</Text>
            <Text style={styles.cardText}>
              View all produce received from distributors and check status.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png10_fs.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Add Final Price & Stock</Text>
            <Text style={styles.cardText}>
              Update stock quantities and set final selling price for each crop.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png11_gq.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Generate QR Code</Text>
            <Text style={styles.cardText}>
              Create QR codes for consumers to track products and verify authenticity.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png12_so.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Sales Overview</Text>
            <Text style={styles.cardText}>
              Check sales performance and basic charts to analyze trends.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RetailerPage;

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
