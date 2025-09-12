import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Action = {
  title: string;
  description: string;
  image: any; 
};

const retailerActions: Action[] = [
  {
    title: "Received Produce",
    description:
      "View all produce received from distributors and check status.",
    image: require("../assets/Images/png9_rp.png"),
  },
  {
    title: "Add Final Price & Stock",
    description:
      "Update stock quantities and set final selling price for each crop.",
    image: require("../assets/Images/png10_fs.png"),
  },
  {
    title: "Generate QR Code",
    description:
      "Create QR codes for consumers to track products and verify authenticity.",
    image: require("../assets/Images/png11_gq.png"),
  },
  {
    title: "Sales Overview",
    description:
      "Check sales performance and basic charts to analyze trends.",
    image: require("../assets/Images/png12_so.png"),
  },
];

export default function RetailerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Retailer Dashboard</Text>
        <Text style={styles.subtitle}>
          Manage your stock, pricing, sales, and generate QR codes for consumers.
        </Text>

        <View style={styles.cardsContainer}>
          {retailerActions.map(({ title, description, image }) => (
            <TouchableOpacity key={title} style={styles.actionCard}>
              <Image source={image} style={styles.actionImage} resizeMode="cover" />
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
  container: { flex: 1, backgroundColor: "#fdfbf5" },
  content: { paddingHorizontal: 20, paddingBottom: 30 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "black",
    marginTop: 10,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 25,
  },
  cardsContainer: { flexDirection: "column", gap: 20 },
  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  actionImage: {
    width: "100%",
    height: 180,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E2B21",
    marginTop: 15,
    marginHorizontal: 15,
    textAlign: "center",
  },
  actionDescription: {
    fontSize: 15,
    color: "black",
    lineHeight: 22,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 6,
  },
});