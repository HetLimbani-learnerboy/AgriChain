// DistributorPage.tsx
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

const DistributorPage: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Distributor Dashboard</Text>
        <Text style={styles.subHeader}>
          Manage logistics, transport, and storage efficiently.
        </Text>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png5_ip.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Incoming Produce</Text>
            <Text style={styles.cardText}>
              Check all produce arriving from farmers before transport.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png6_ts.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Update Transport & Storage</Text>
            <Text style={styles.cardText}>
              Track pickup dates, storage temperatures, and delivery status.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png7_li.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Logistics Overview</Text>
            <Text style={styles.cardText}>
              View current shipments, transport routes, and pending deliveries.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require("../assets/Images/png8_mi.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Market Insights</Text>
            <Text style={styles.cardText}>
              Get updates on market demand, pricing trends, and forecasts.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DistributorPage;

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