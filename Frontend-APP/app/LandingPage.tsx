import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";


// ---- If you have a typed root stack, replace these with your route names ----
type RootStackParamList = {
  LandingPage: undefined;
  MainDashboardPage: undefined;
  SignInPage: undefined;
  SignUpPage: undefined;
  ContactUsPage: undefined;
  HelpDeskPage: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

interface TeamMember {
  name: string;
  role: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

const LandingPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
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
          source={require('../assets/MainLogo.png')} // adjust path as needed
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
            style={[styles.heroBtn, styles.heroBtnPrimary]}
            onPress={() => router.push("/")} // This opens index.tsx
          >
            <Text style={[styles.heroBtnText, styles.heroBtnTextPrimary]}>
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

/* ----------- Styles ----------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  heroBox: {
    minHeight: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 24,
    // backgroundColor: '#ffffff',
  },
  logo: {
    width: width * 0.6,
    height: 120,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroTagline: {
    fontSize: 18,
    fontWeight: '300',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 28,
  },
  authButtonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  heroBtn: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderWidth: 2,
    borderColor: '#166534',
    borderRadius: 50,
    margin: 6,
    backgroundColor: 'transparent',
  },
  heroBtnPrimary: {
    backgroundColor: '#166534',
  },
  heroBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  heroBtnTextPrimary: {
    color: '#ffffff',
  },
  section: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  processCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  processNumber: {
    fontSize: 40,
    fontWeight: '700',
    color: '#f0fdf4',
    position: 'absolute',
    top: 0,
    left: 10,
  },
  processTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1a1a1a',
  },
  processDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  teamCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#166534',
  },
  teamRole: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  footer: {
    backgroundColor: '#166534',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerLink: {
    color: '#ffffff',
    fontSize: 15,
    marginHorizontal: 10,
    textDecorationLine: 'underline',
  },
});
