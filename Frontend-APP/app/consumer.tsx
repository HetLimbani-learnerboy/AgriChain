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

const consumerActions: Action[] = [
  {
    title: "Traceability View",
    description:
      "Crop → Farmer Details → Transport Info → Retail Price. Visualized as a timeline or flowchart for easy tracking.",
    image: require("../assets/Images/png13_tv.png"),
  },
  {
    title: "QR Code Verification",
    description:
      "Scan or view QR codes for product authentication and detailed info.",
    image: require("../assets/Images/png14_qv.png"),
  },
  {
    title: "Sustainability Tips",
    description:
      "Learn about eco-friendly practices and support sustainable agriculture.",
    image: require("../assets/Images/png15_st.png"),
  },
];

export default function ConsumerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Consumer Portal</Text>
        <Text style={styles.subtitle}>
          Scan QR codes and track the complete supply chain of your produce.
        </Text>

        <View style={styles.cardsContainer}>
          {consumerActions.map(({ title, description, image }) => (
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
