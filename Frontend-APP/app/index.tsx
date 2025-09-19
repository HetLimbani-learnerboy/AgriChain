import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import '../src/i18n/i18n.config';
import { changeLanguage } from "i18next";

export default function Dashboard() {
  const { t } = useTranslation(); // ✅ use hook

  const stats = [
    { label: t("Products"), value: "1,428" },
    { label: t("Batches"), value: "76" },
    { label: t("Stakeholders"), value: "112" },
    { label: t("Transactions"), value: "5,890" },
  ];

  const changeLanguage = (lang: "en" | "hi" | "gu") => {
    i18n.changeLanguage(lang);
  };

  return (
    <SafeAreaView style={styles.container}>
     
      <ScrollView contentContainerStyle={styles.content}>
        {/* <View><Text>Hello</Text></View> */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/MainLogo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
       <Text style={styles.title}>{i18n.t("DashboardWelcome")}</Text>
      <Text style={styles.subtitle}>{i18n.t("DashboardSubtitle")}</Text>

        <View style={styles.statsContainer}>
          {stats.map(({ label, value }) => (
            <View key={label} style={styles.statCard}>
              <Text style={styles.statNumber}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

       
      </ScrollView>
    </SafeAreaView>

    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfbf5" },
  content: { padding: 20, alignItems: "center" },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoImage: { width: 80, height: 80, borderRadius: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1E2B21", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#38423d", textAlign: "center", marginBottom: 30 },
  statsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 15 },
  statCard: { backgroundColor: "#fff", padding: 20, borderRadius: 15, alignItems: "center", width: "45%", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  statNumber: { fontSize: 24, fontWeight: "bold", color: "#269b59" },
  statLabel: { fontSize: 14, color: "#666", marginTop: 5 },
});
