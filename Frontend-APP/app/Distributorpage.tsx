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
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

type Action = {
  title: string;
  description: string;
  image: any;
};

export default function DistributorScreen() {
  const { t } = useTranslation();

  const distributorActions: Action[] = [
    {
      title: t("incomingProduceTitle"),
      description: t("incomingProduceDesc"),
      image: require("../assets/Images/png5_ip.png"),
    },
    {
      title: t("updateTransportTitle"),
      description: t("updateTransportDesc"),
      image: require("../assets/Images/png6_ts.png"),
    },
    {
      title: t("logisticsOverviewTitle"),
      description: t("logisticsOverviewDesc"),
      image: require("../assets/Images/png7_li.png"),
    },
    {
      title: t("marketInsightsTitle"),
      description: t("marketInsightsDesc"),
      image: require("../assets/Images/png8_mi.png"),
    },
  ];

  const changeLanguage = (lang: "en" | "hi" | "gu") => {
    i18n.changeLanguage(lang);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t("distributorDashboard")}</Text>
        <Text style={styles.subtitle}>{t("manageLogistics")}</Text>

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
  container: { flex: 1, backgroundColor: "#f7faf1" },
  content: { paddingHorizontal: 20, paddingBottom: 30 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "black",
    marginTop: 10,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 25 },
  cardsContainer: { flexDirection: "column", gap: 20 },
  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  actionImage: { width: "100%", height: 180 },
  actionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
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
