import React from 'react';
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

  const team: TeamMember[] = [
    { name: 'Het Limbani', role: 'Project Lead & Full-Stack Developer' },
    { name: 'Abhi Patel', role: 'Blockchain Developer' },
    { name: 'Anuj Raval', role: 'Blockchain Developer' },
    { name: 'Tirtha Jhaveri', role: 'Mobile App Developer' },
    { name: 'Harsh Patel', role: 'Full-Stack Developer' },
    { name: 'Meet Babariya', role: 'Mobile App Developer' },
  ];

  const processSteps: ProcessStep[] = [
    { title: 'Cultivation', description: 'Farmers register their produce, creating the first digital link in the chain.' },
    { title: 'Processing', description: 'Processors log every step, from cleaning to packaging, ensuring quality control.' },
    { title: 'Distribution', description: 'Distributors track shipments in real-time, maintaining the integrity of the supply line.' },
    { title: 'Retail', description: 'Retailers provide consumers with a scannable QR code for full product history.' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
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
          AgriChain leverages blockchain to bring radical transparency to the agricultural supply chain.
        </Text>

        <View style={styles.authButtonGroup}>
          <TouchableOpacity
            style={[styles.heroBtn, styles.primaryBtn]}
            onPress={() => router.push("/")}
          >
            <Text style={[styles.heroBtnText, styles.heroBtnTextPrimary]}>
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.heroBtn} onPress={() => router.push("/signinPage")}>
            <Text style={styles.heroBtnText}>{t("SignIn")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.heroBtn} onPress={() => router.push("/signuppage")}>
            <Text style={styles.heroBtnText}>{t("SignUp")}</Text>
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
            <Text style={styles.processTitle}>{step.title}</Text>
            <Text style={styles.processDescription}>{step.description}</Text>
          </View>
        ))}
      </View>

      {/* Team */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meet the Innovators</Text>
        <Text style={styles.sectionSubtitle}>
          The dedicated team building the future of agricultural transparency.
        </Text>

        {team.map(member => (
          <View key={member.name} style={styles.teamCard}>
            <Text style={styles.teamName}>{member.name}</Text>
            <Text style={styles.teamRole}>{member.role}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 AgriChain. All Rights Reserved.</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('ContactUsPage')}>
            <Text style={styles.footerLink}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HelpDeskPage')}>
            <Text style={styles.footerLink}>Help Desk</Text>
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