import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import "../i18n"; // i18n configuration
import { Ionicons } from "@expo/vector-icons";

const ForgetPassword: React.FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [sending, setSending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const otpRefs = useRef<TextInput[]>([]);

  const passwordValid = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  
  const isPasswordMatch = password && password === confirmPassword;

  // OTP input handler
  const handleOtpChange = (value: string, i: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[i] = value;
      setOtp(newOtp);
      if (value && i < 5) otpRefs.current[i + 1]?.focus();
    }
  };

  // Generate OTP locally
  const sendOtp = () => {
    setSending(true);
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    alert(`${t("YourOtpIs")}: ${otpCode}`);
    setStep(2);
    setResendTimer(30);
    setSending(false);
  };

  // OTP resend timer
  useEffect(() => {
    if (step === 2 && resendTimer > 0) {
      const interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer, step]);

  // Verify OTP locally
  const verifyOtp = () => {
    if (otp.join("") === generatedOtp) setStep(3);
    else alert(t("InvalidOtp"));
  };

  useEffect(() => {
    if (step === 2 && otp.join("").length === 6) verifyOtp();
  }, [otp]);

  // Reset password locally
  const resetPassword = () => {
    if (!Object.values(passwordValid).every(Boolean)) {
      alert(t("PasswordNotMeet"));
      return;
    }
    if (!isPasswordMatch) {
      alert(t("PasswordsNotMatch"));
      return;
    }
    alert(t("PasswordResetSuccess"));
    router.push("/LandingPage");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.title}>{t("ForgotPassword")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("EnterEmail")}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={sending}>
            <Text style={styles.buttonText}>{sending ? t("Sending") : t("SendOtp")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.link}>{t("GoBack")}</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.title}>{t("EnterOtp")}</Text>
          <View style={styles.otpWrapper}>
            {otp.map((d, i) => (
              <TextInput
                key={i}
                ref={(el) => { otpRefs.current[i] = el!; }}
                value={d}
                onChangeText={(val) => handleOtpChange(val, i)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpBox}
              />
            ))}
          </View>
          {resendTimer > 0 ? (
            <TouchableOpacity disabled>
              <Text>{t("ResendOtpIn")} {resendTimer}s</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={sendOtp}>
              <Text>{t("ResendOtp")}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {step === 3 && (
        <View style={styles.card}>
          <Text style={styles.title}>{t("ResetPassword")}</Text>
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
          <View>
            <Text style={{ color: passwordValid.length ? "green" : "red" }}>• {t("Min8Chars")}</Text>
            <Text style={{ color: passwordValid.upper ? "green" : "red" }}>• {t("Uppercase")}</Text>
            <Text style={{ color: passwordValid.lower ? "green" : "red" }}>• {t("Lowercase")}</Text>
            <Text style={{ color: passwordValid.number ? "green" : "red" }}>• {t("Number")}</Text>
            <Text style={{ color: passwordValid.special ? "green" : "red" }}>• {t("SpecialChar")}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder={t("ConfirmPassword")}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {!isPasswordMatch && confirmPassword && <Text style={{ color: "red" }}>{t("PasswordsNotMatch")}</Text>}
          <TouchableOpacity
            style={styles.button}
            disabled={!Object.values(passwordValid).every(Boolean) || !isPasswordMatch}
            onPress={resetPassword}
          >
            <Text style={styles.buttonText}>{t("ResetPassword")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: "30%",
  },
  card: { width: "100%", backgroundColor: "#fff", padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: "#2ecc71", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { color: "#2980b9", textAlign: "center", marginTop: 10 },
  otpWrapper: { flexDirection: "row", justifyContent: "space-between" },
  otpBox: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, textAlign: "center", width: 40 },
  passwordWrapper: { flexDirection: "row", alignItems: "center" },
   passwordField: {
    position: "relative",
    justifyContent: "center",
  },
});

export default ForgetPassword;
