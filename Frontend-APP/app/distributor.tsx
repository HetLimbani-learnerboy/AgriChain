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

const distributorActions: Action[] = [
  {
    title: "Incoming Produce",
    description: "Check all produce arriving from farmers before transport.",
    image: require("../assets/Images/png5_ip.png"),
  },
  {
    title: "Update Transport & Storage",
    description: "Track pickup dates, storage temperatures, and delivery status.",
    image: require("../assets/Images/png6_ts.png"),
  },
  {
    title: "Logistics Overview",
    description: "View current shipments, transport routes, and pending deliveries.",
    image: require("../assets/Images/png7_li.png"),
  },
  {
    title: "Market Insights",
    description: "Get updates on market demand, pricing trends, and forecasts.",
    image: require("../assets/Images/png8_mi.png"),
  },
];

export default function DistributorScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Distributor Dashboard</Text>
        <Text style={styles.subtitle}>
          Manage logistics, transport, and storage efficiently.
        </Text>

        <View style={styles.cardsContainer}>
          {distributorActions.map(({ title, description, image }) => (
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
    color: "#666",
    lineHeight: 22,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 6,
  },
});
