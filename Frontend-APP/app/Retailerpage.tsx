import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

type Action = { titleKey: string; descriptionKey: string; image: any };

const retailerActions: Action[] = [
  { titleKey: "ReceivedProduce", descriptionKey: "ReceivedProduceDesc", image: require("../assets/Images/png9_rp.png") },
  { titleKey: "AddFinalPriceStock", descriptionKey: "AddFinalPriceStockDesc", image: require("../assets/Images/png10_fs.png") },
  { titleKey: "GenerateQRCode", descriptionKey: "GenerateQRCodeDesc", image: require("../assets/Images/png11_gq.png") },
  { titleKey: "SalesOverview", descriptionKey: "SalesOverviewDesc", image: require("../assets/Images/png12_so.png") },
];

export default function RetailerScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t("RetailerDashboard")}</Text>
        <Text style={styles.subtitle}>{t("RetailerSubtitle")}</Text>

        <View style={styles.cardsContainer}>
          {retailerActions.map(({ titleKey, descriptionKey, image }) => (
            <TouchableOpacity key={titleKey} style={styles.actionCard}>
              <Image source={image} style={styles.actionImage} resizeMode="cover" />
              <Text style={styles.actionTitle}>{t(titleKey)}</Text>
              <Text style={styles.actionDescription}>{t(descriptionKey)}</Text>
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
  title: { fontSize: 28, fontWeight: "700", color: "#1E2B21", marginTop: 10, marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 25 },
  cardsContainer: { flexDirection: "column", gap: 20 },
  actionCard: { backgroundColor: "#fff", borderRadius: 18, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4, alignItems: "center" },
  actionImage: { width: "100%", height: 180 },
  actionTitle: { fontSize: 20, fontWeight: "600", color: "#1E2B21", marginTop: 15, marginHorizontal: 15, textAlign: "center" },
  actionDescription: { fontSize: 15, color: "#666", lineHeight: 22, textAlign: "center", marginHorizontal: 20, marginBottom: 20, marginTop: 6 },
});
