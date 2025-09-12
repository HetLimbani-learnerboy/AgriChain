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
  image: any; // local image
};

const farmerActions: Action[] = [
  {
    title: "Add Produce",
    description:
      "Add new crops with details like crop name, quantity, price, grade, and location.",
    image: require("../assets/Images/png1_ap.png"),
  },
  {
    title: "My Produce List",
    description:
      "Track the status of your crops from Added → Transported → Sold.",
    image: require("../assets/Images/png2_pl.png"),
  },
  {
    title: "Earnings Overview",
    description:
      "View your total earnings, recent transactions, and profit summary.",
    image: require("../assets/Images/png3_eo.png"),
  },
  {
    title: "Market Prices",
    description:
      "Stay updated with the latest market rates and pricing trends for different crops.",
    image: require("../assets/Images/png4_mp.png"),
  },
];

export default function FarmerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Farmer Dashboard</Text>
        <Text style={styles.subtitle}>
          Manage your crops, earnings, and market insights.
        </Text>

        <View style={styles.cardsContainer}>
          {farmerActions.map(({ title, description, image }) => (
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
  container: {
    flex: 1,
    backgroundColor: "#f7faf1",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E2B21",
    marginTop: 10,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 20,
  },
  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
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
    color: "#666",
    lineHeight: 22,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 6,
  },
});