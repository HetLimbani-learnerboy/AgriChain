// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useTranslation } from "react-i18next";
// import i18n from "../i18n";        // adjust path if your i18n.ts is elsewhere
// import "../src/i18n/i18n.config";  // ensure your i18n config is loaded

// export default function Index() {
//   const { t } = useTranslation();

//   const stats = [
//     { label: t("Products"), value: "1,428" },
//     { label: t("Batches"), value: "76" },
//     { label: t("Stakeholders"), value: "112" },
//     { label: t("Transactions"), value: "5,890" },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <View style={styles.logoContainer}>
//           <Image
//             source={require("../assets/MainLogo.png")}
//             style={styles.logoImage}
//             resizeMode="contain"
//           />
//         </View>

//         <Text style={styles.title}>{t("DashboardWelcome")}</Text>
//         <Text style={styles.subtitle}>{t("DashboardSubtitle")}</Text>

//         <View style={styles.statsContainer}>
//           {stats.map(({ label, value }) => (
//             <View key={label} style={styles.statCard}>
//               <Text style={styles.statNumber}>{value}</Text>
//               <Text style={styles.statLabel}>{label}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fdfbf5" },
//   content: { padding: 20, alignItems: "center" },
//   logoContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//     height: 120,
//     width: 120,
//     borderRadius: 60,
//     backgroundColor: "#ffffff",
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   logoImage: { width: 80, height: 80, borderRadius: 40 },
//   title: { fontSize: 28, fontWeight: "bold", color: "#1E2B21", marginBottom: 8 },
//   subtitle: { fontSize: 16, color: "#38423d", textAlign: "center", marginBottom: 30 },
//   statsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     gap: 15,
//   },
//   statCard: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 15,
//     alignItems: "center",
//     width: "45%",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   statNumber: { fontSize: 24, fontWeight: "bold", color: "#269b59" },
//   statLabel: { fontSize: 14, color: "#666", marginTop: 5 },
// });

// app/index.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Interfaces
interface TeamMember {
  name: string;
  role: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

export default function Index() {
  const router = useRouter();

  const team: TeamMember[] = [
    { name: "Het Limbani", role: "Project Lead & Full-Stack Developer" },
    { name: "Abhi Patel", role: "Blockchain Developer" },
    { name: "Anuj Raval", role: "Blockchain Developer" },
    { name: "Tirtha Jhaveri", role: "Mobile App Developer" },
    { name: "Harsh Patel", role: "Full-Stack Developer" },
    { name: "Meet Babariya", role: "Mobile App Developer" },
  ];

  const processSteps: ProcessStep[] = [
    {
      title: "Cultivation",
      description:
        "Farmers register their produce, creating the first digital link in the chain.",
    },
    {
      title: "Processing",
      description:
        "Processors log every step, from cleaning to packaging, ensuring quality control.",
    },
    {
      title: "Distribution",
      description:
        "Distributors track shipments in real-time, maintaining the integrity of the supply line.",
    },
    {
      title: "Retail",
      description:
        "Retailers provide consumers with a scannable QR code for full product history.",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
    >
      {/* Hero Section */}
      <View style={styles.heroBox}>
        <Image
          source={require("../assets/MainLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.heroTitle}>Welcome to AgriChain 🔗</Text>
        <Text style={styles.heroTagline}>
          Track the supply chain from farm to fork with transparency.
        </Text>
        <Text style={styles.heroDescription}>
          AgriChain leverages blockchain to bring radical transparency to the
          agricultural supply chain.
        </Text>

        <View style={styles.authBtnGroup}>
          <TouchableOpacity
            style={[styles.heroBtn, styles.primaryBtn]}
            onPress={() => router.push("/GetStartedPage")}
          >
            <Text style={[styles.heroBtnText, styles.primaryBtnText]}>
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => router.push("/signinPage")}
          >
            <Text style={styles.heroBtnText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => router.push("/signuppage")}
          >
            <Text style={styles.heroBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How AgriChain Works</Text>
        <Text style={styles.sectionSubtitle}>
          A simple, four-step process to ensure complete transparency.
        </Text>

        {processSteps.map((step, index) => (
          <View key={step.title} style={styles.processCard}>
            <Text style={styles.processNumber}>{index + 1}</Text>
            <Text style={styles.processCardTitle}>{step.title}</Text>
            <Text style={styles.processCardDesc}>{step.description}</Text>
          </View>
        ))}
      </View>

      {/* Team */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meet the Innovators</Text>
        <Text style={styles.sectionSubtitle}>
          The dedicated team building the future of agricultural transparency.
        </Text>

        {team.map((member) => (
          <View key={member.name} style={styles.teamCard}>
            <Text style={styles.teamName}>{member.name}</Text>
            <Text style={styles.teamRole}>{member.role}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footerBar}>
        <Text style={styles.footerText}>© 2025 AgriChain. All Rights Reserved.</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Help Desk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0fdf4" },
  heroBox: {
    minHeight: Dimensions.get("window").height * 0.9,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fdfbf5",
  },
  logo: { width: width * 0.7, maxWidth: 260, height: 120, marginBottom: 20 },
  heroTitle: { fontSize: 34, fontWeight: "700", textAlign: "center", marginBottom: 8, color: "#1a1a1a" },
  heroTagline: { fontSize: 18, fontWeight: "300", textAlign: "center", marginBottom: 12, maxWidth: 600, color: "#1a1a1a" },
  heroDescription: { fontSize: 16, lineHeight: 24, textAlign: "center", maxWidth: 650, marginBottom: 28, color: "#1a1a1a" },
  authBtnGroup: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 12 },
  heroBtn: { paddingVertical: 12, paddingHorizontal: 28, borderWidth: 2, borderColor: "#166534", borderRadius: 50, margin: 6, backgroundColor: "transparent" },
  heroBtnText: { fontSize: 16, fontWeight: "600", color: "#1a1a1a" },
  primaryBtn: { backgroundColor: "#166534" },
  primaryBtnText: { color: "#fff" },
  section: { paddingVertical: 50, paddingHorizontal: 20, alignItems: "center" },
  sectionTitle: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 8, color: "#1a1a1a" },
  sectionSubtitle: { fontSize: 16, color: "black", textAlign: "center", marginBottom: 30, maxWidth: 600, alignSelf: "center" },
  processCard: { width: width > 768 ? width / 2.3 : "90%", backgroundColor: "#fff", padding: 24, borderRadius: 15, borderWidth: 1, borderColor: "#e5e7eb", marginBottom: 20, alignItems: "center" },
  processNumber: { position: "absolute", top: -10, left: 15, fontSize: 48, fontWeight: "700", color: "black" },
  processCardTitle: { fontSize: 20, fontWeight: "600", marginBottom: 6, color: "#1a1a1a", textAlign: "center" },
  processCardDesc: { fontSize: 15, textAlign: "center", color: "#444" },
  teamCard: { width: width > 768 ? width / 2.3 : "90%", backgroundColor: "#f8fafc", padding: 24, borderRadius: 15, marginBottom: 20, alignItems: "center" },
  teamName: { fontSize: 20, fontWeight: "600", color: "#166534", textAlign: "center" },
  teamRole: { fontSize: 14, color: "#333", marginTop: 4, textAlign: "center" },
  footerBar: { backgroundColor: "#166534", paddingVertical: 20, paddingHorizontal: 16, width: "100%", alignItems: "center" },
  footerText: { color: "#ffffff", fontSize: 14, textAlign: "center" },
  footerLinks: { flexDirection: "row", gap: 16, marginTop: 8 },
  footerLink: { color: "#ffffff", fontSize: 15, textDecorationLine: "underline" },
});
