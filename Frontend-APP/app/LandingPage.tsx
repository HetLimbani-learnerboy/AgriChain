import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const { width } = Dimensions.get("window");

// Stack Param List
type RootStackParamList = {
  LandingPage: undefined;
  MainDashboardPage: undefined;
  SignInPage: undefined;
  SignUpPage: undefined;
  ContactUsPage: undefined;
  HelpDeskPage: undefined;
};

// Interfaces
interface TeamMember {
  name: string;
  role: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

const LandingPage: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();


  // Hero fade-in animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const team: TeamMember[] = [
  { name: i18n.t("HetLimbani"), role: i18n.t("ProjectLead") },
  { name: i18n.t("AbhiPatel"), role: i18n.t("BlockchainDev") },
  { name: i18n.t("AnujRaval"), role: i18n.t("BlockchainDev") },
  { name: i18n.t("TirthaJhaveri"), role: i18n.t("MobileAppDev") },
  { name: i18n.t("HarshPatel"), role: i18n.t("FullStackDev") },
  { name: i18n.t("MeetBabariya"), role: i18n.t("MobileAppDev") },
];
 const processSteps: ProcessStep[] = [
  {
    title: i18n.t("Cultivation"),
    description: i18n.t("CultivationDesc"),
  },
  {
    title: i18n.t("Processing"),
    description: i18n.t("ProcessingDesc"),
  },
  {
    title: i18n.t("Distribution"),
    description: i18n.t("DistributionDesc"),
  },
  {
    title: i18n.t("Retail"),
    description: i18n.t("RetailDesc"),
  },
];

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={{ paddingBottom: 40 }}>
       {/* HERO */}
      <Animated.View style={[styles.heroBox, { opacity: fadeAnim }]}>
        <Image
          source={require("../assets/MainLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.heroTitle}>{t("Welcome")}</Text>
        <Text style={styles.heroTagline}>{t("Tagline")}</Text>
        <Text style={styles.heroDescription}>{t("Description")}</Text>
        <View style={styles.authBtnGroup}>
          <TouchableOpacity
            style={[styles.heroBtn, styles.primaryBtn]}
            onPress={() => router.push("/")}
          >
            <Text style={[styles.heroBtnText, styles.primaryBtnText]}>
              {t("GetStarted")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.heroBtn} onPress={() => router.push("/signinPage")}>
            <Text style={styles.heroBtnText}>{t("SignIn")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.heroBtn} onPress={() => router.push("/signuppage")}>
            <Text style={styles.heroBtnText}>{t("SignUp")}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      
      {/* HOW IT WORKS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("HowItWorks")}</Text>
        <Text style={styles.sectionSubtitle}>{t("HowItWorksDesc")}</Text>

        <View style={styles.processGrid}>
          {processSteps.map((step, i) => (
            <View key={i} style={styles.processCard}>
              <Text style={styles.processCardTitle}>{step.title}</Text>
              <Text style={styles.processCardDesc}>{step.description}</Text>
            </View>
          ))}
        </View>
      </View>

       {/* TEAM */}
      <View style={[styles.section, { backgroundColor: "#fff" }]}>
        <Text style={styles.sectionTitle}>{t("MeetTeam")}</Text>
        <Text style={styles.sectionSubtitle}>{t("MeetTeamDesc")}</Text>

        <View style={styles.teamGrid}>
          {team.map((member) => (
            <View key={member.name} style={styles.teamCard}>
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footerBar}>
        <Text style={styles.footerText}>{t("Footer")}</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("ContactUsPage")}>
            <Text style={styles.footerLink}>{t("Contact")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("HelpDeskPage")}>
            <Text style={styles.footerLink}>{t("HelpDesk")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f0fdf4",
  },
  heroBox: {
    minHeight: Dimensions.get("window").height * 0.9,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fdfbf5",
  },
  logo: {
    width: width * 0.7,
    maxWidth: 260,
    height: 120,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  heroTagline: {
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 12,
    maxWidth: 600,
    color: "#1a1a1a",
  },
  heroDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 650,
    marginBottom: 28,
    color: "#1a1a1a",
  },
  authBtnGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  heroBtn: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderWidth: 2,
    borderColor: "#166534",
    borderRadius: 50,
    margin: 6,
    backgroundColor: "transparent",
  },
  heroBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  primaryBtn: {
    backgroundColor: "#166534",
  },
  primaryBtnText: {
    color: "#fff",
  },
  section: {
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 30,
    maxWidth: 600,
    alignSelf: "center",
  },
  processGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  processCard: {
    width: width > 768 ? width / 2.3 : "90%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  processNumber: {
    position: "absolute",
    top: -10,
    left: 15,
    fontSize: 48,
    fontWeight: "700",
    color: "black",
  },
  processCardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
    color: "#1a1a1a",
  },
  processCardDesc: {
    fontSize: 15,
    textAlign: "center",
    color: "#444",
  },
  teamGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  teamCard: {
    width: width > 768 ? width / 2.3 : "90%",
    backgroundColor: "#f8fafc",
    padding: 24,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
    alignItems: "center",
  },
  teamName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#166534",
  },
  teamRole: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
    textAlign: "center",
  },
  footerBar: {
    backgroundColor: "#166534",
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },
  footerLinks: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  footerLink: {
    color: "#ffffff",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});