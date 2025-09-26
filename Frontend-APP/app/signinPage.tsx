import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import "../i18n";

export default function SignInPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log("Email:", email, "Password:", password);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.formTitle}>{t("SignIn")}</Text>

        <Text style={styles.label}>{t("EmailAddress")}</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>{t("Password")}</Text>
        <View style={styles.passwordField}>
          <TextInput
  style={styles.input}
  value={password}
  onChangeText={setPassword}
  secureTextEntry={!showPassword}  // Control with your state
  placeholder="Password"
  // 👇 Prevents system autofill/extra UI (sometimes adds its own icon)
  textContentType="none"
  autoComplete="off"
/>
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#374151"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signinBtn} onPress={handleSubmit}>
          <Text style={styles.signinBtnText}>{t("SignIn")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleBtn}>
          <Image
            // source={require("../assets/GoogleLogo.png")}
            style={styles.googleIcon}
            resizeMode="contain"
          />
          <Text style={styles.googleText}>{t("SignInGoogle")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/forgetpasswordpage")}
          style={{ marginTop: 10 }}
        >
          <Text style={styles.linkText}>{t("ForgotPassword")}</Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>{t("NoAccount")}</Text>
          <TouchableOpacity onPress={() => router.push("/signuppage")}>
            <Text style={styles.linkText}>{t("SignUp")}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={[styles.linkText, { marginTop: 8 }]}>{t("BackHome")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "#fdfbf5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    maxWidth: 420,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#374151",
  },
  label: {
    fontWeight: "600",
    color: "#374151",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 4,
  },
  passwordField: {
    position: "relative",
    justifyContent: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: "30%",
  },
  signinBtn: {
    marginTop: 20,
    backgroundColor: "#16a34a",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  signinBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleBtn: {
    marginTop: 14,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: { width: 20, height: 20, marginRight: 8 },
  googleText: { fontSize: 16, color: "#374151", fontWeight: "500" },
  linkText: {
    color: "#16a34a",
    fontWeight: "bold",
    textAlign: "center",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  switchText: { fontSize: 16, marginRight: 6, color: "#374151" },
  branding: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  brandLogo: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 100,
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 22,
    color: "#065f46",
    textAlign: "center",
    fontWeight: "600",
  },
});
