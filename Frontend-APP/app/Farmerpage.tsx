// FarmerPage.tsx
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

const FarmerPage: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
    
      {/* Dashboard Content */}
      <View style={styles.content}>
        <Text style={styles.header}>Farmer Dashboard</Text>
        <Text style={styles.subHeader}>
          Manage your crops, earnings, and market insights.
        </Text>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png1_ap.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Add Produce</Text>
            <Text style={styles.cardText}>
              Add new crops with details like crop name, quantity, price, grade,
              and location.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png2_pl.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>My Produce List</Text>
            <Text style={styles.cardText}>
              Track the status of your crops from Added → Transported → Sold.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png3_eo.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Earnings Overview</Text>
            <Text style={styles.cardText}>
              View your total earnings, recent transactions, and profit summary.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png4_mp.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Market Prices</Text>
            <Text style={styles.cardText}>
              Stay updated with the latest market rates and pricing trends for
              different crops.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FarmerPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfbf5" },
  content: { padding: 16 },
  header: { fontSize: 28, fontWeight: "700", color: "#166534", marginBottom: 8 },
  subHeader: { fontSize: 16, marginBottom: 16, color: "#333" },
  cardsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
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
  cardImage: { width: "100%", height: 100, borderRadius: 8, marginBottom: 8, resizeMode: "contain" },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4, color: "#166534" },
  cardText: { fontSize: 14, color: "#333" },
});
