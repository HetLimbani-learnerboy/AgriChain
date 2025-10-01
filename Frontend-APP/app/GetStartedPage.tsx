// GetStartedPage.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const content = {
  welcome: "AgriChain",
  title: "Track the supply chain from farm to fork with transparency.",
  government: "Government Collaboration",
  govText1:
    "AgriChain allows government agencies to integrate directly with the supply chain ecosystem. This ensures proper monitoring of agricultural resources, subsidies, and quality standards.",
  govText2:
    "By connecting with AgriChain, government departments can reduce bureaucracy, increase accountability, and support sustainable agricultural practices nationwide.",
  learnMore: "Learn More",
  workflowTitle: "End-to-End Workflow",
  steps: [
    {
      title: "1. Farmer Adds Produce",
      text: "Farmer logs into the Web/Mobile App, enters crop details (name, quantity, price, quality, location). Backend stores data in the database and sends a transaction to the blockchain. A QR code and Batch ID are generated, linked to the blockchain record.",
    },
    {
      title: "2. Distributor Picks Up Produce",
      text: "Distributor logs into the Web App to view available batches. Updates transport details such as pickup time, storage conditions, and delivery status. Backend updates both database and blockchain, creating a tamper-proof record.",
    },
    {
      title: "3. Retailer Receives Produce",
      text: "Retailer logs in to view incoming batches, updates final price, stock availability, and confirms receipt. Backend again updates database and blockchain, ensuring full traceability and verified pricing.",
    },
    {
      title: "4. Consumer Scans QR Code",
      text: "Consumer scans the QR code via Mobile App. The app calls the backend to fetch batch history from the blockchain, showing the entire journey: Farmer → Distributor → Retailer, with quality info, price transparency, and timestamps.",
    },
    {
      title: "5. Blockchain Role",
      text: "Every update—Farmer to Distributor to Retailer—is committed to the blockchain. Immutable records prevent tampering or fraud, and each transaction is forever linked to the Batch ID for complete traceability.",
    },
    {
      title: "6. Government Oversight",
      text: "Government agencies can monitor production, subsidies, and food safety in real time. Through secure dashboards they track blockchain-verified data, enforce quality standards, and quickly respond to supply-chain issues, ensuring nationwide agricultural transparency and support for farmers.",
    },
  ],
};

const GetStartedPage: React.FC = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("");

const handleRoleSelect = () => {
  if (!selectedRole) return;

  switch (selectedRole) {
    case "Farmer":
      router.push("/Farmerpage"); 
      break;
    case "Distributor":
      router.push("/Distributorpage");
      break;
    case "Retailer":
      router.push("/Retailerpage");
      break;
    case "Consumer":
      router.push("/Consumerpage");
      break;
    default:
      console.warn("Unknown role selected:", selectedRole);
  }
};


  return (
    <ScrollView style={styles.landingWrapper}>
      {/* Role Dropdown */}
      <View style={styles.roleContainer}>
        <Text style={styles.roleTitle}>Select Your Role</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Role..." value="" />
            <Picker.Item label="Farmer" value="Farmer" />
            <Picker.Item label="Distributor" value="Distributor" />
            <Picker.Item label="Retailer" value="Retailer" />
            <Picker.Item label="Consumer" value="Consumer" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.roleSelectBtn} onPress={handleRoleSelect}>
          <Text style={styles.roleSelectBtnText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In / Sign Up Buttons */}
      <View style={styles.signContainer}>
        <TouchableOpacity
          style={styles.signinBtn}
          onPress={() => router.push("/signinPage")}
        >
          <Text style={styles.signinBtnText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => router.push("/signuppage")}
        >
          <Text style={styles.signupBtnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Header Section */}
      <View style={styles.landingHeader}>
        <Text style={styles.headerTitle}>{content.welcome} 🌾</Text>
        <Text style={styles.headerText}>{content.title}</Text>
      </View>

      {/* Government Section */}
      <View style={styles.landingGovernment}>
        <Text style={styles.sectionTitle}>{content.government}</Text>
        <Text style={styles.sectionText}>{content.govText1}</Text>
        <Text style={styles.sectionText}>{content.govText2}</Text>
      </View>

      {/* Workflow Section */}
      <View style={styles.workflowSection}>
        <Text style={styles.workflowTitle}>{content.workflowTitle}</Text>
        <View style={styles.workflowSteps}>
          {content.steps.map((step, idx) => (
            <View key={idx} style={styles.workflowCard}>
              <Text style={styles.workflowCardTitle}>{step.title}</Text>
              <Text style={styles.workflowCardText}>{step.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default GetStartedPage;

const styles = StyleSheet.create({
  landingWrapper: { flex: 1, backgroundColor: "#fdfbf5" },
  roleContainer: {
    padding: 16,
    backgroundColor: "#fdfbf5",
    alignItems: "center",
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 12,
  },
  pickerWrapper: {
    width: 200,
    borderWidth: 1,
    borderColor: "#166534",
    borderRadius: 8,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#166534",
  },
  roleSelectBtn: {
    backgroundColor: "#166534",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  roleSelectBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  signContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginVertical: 16,
  },
  signinBtn: {
    backgroundColor: "#166534",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  signinBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  signupBtn: {
    backgroundColor: "#166534",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  signupBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  landingHeader: { alignItems: "center", paddingVertical: 32 },
  headerTitle: { fontSize: 32, fontWeight: "800", color: "#166534", marginBottom: 8 },
  headerText: {
    fontSize: 16,
    fontWeight: "400",
    maxWidth: 600,
    textAlign: "center",
    marginBottom: 16,
  },

  landingGovernment: { padding: 32, backgroundColor: "#f0fdf4", alignItems: "center" },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 8,
    textAlign: "center",
  },
  sectionText: { fontSize: 14, lineHeight: 20, textAlign: "center", marginBottom: 8 },

  workflowSection: { backgroundColor: "#fff", paddingVertical: 48, alignItems: "center" },
  workflowTitle: { fontSize: 24, fontWeight: "700", color: "#166534", marginBottom: 32 },
  workflowSteps: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 16 },
  workflowCard: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 16,
  },
  workflowCardTitle: { fontSize: 18, fontWeight: "700", color: "#166534", marginBottom: 8 },
  workflowCardText: { fontSize: 14, lineHeight: 20, color: "#000" },
});
