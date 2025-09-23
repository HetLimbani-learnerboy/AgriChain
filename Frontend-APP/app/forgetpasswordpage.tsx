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

const ForgetPassword: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState(""); // store OTP locally
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [sending, setSending] = useState(false);

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
    alert(`Your OTP is: ${otpCode}`); // show OTP for testing
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
    if (otp.join("") === generatedOtp) {
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  useEffect(() => {
    if (step === 2 && otp.join("").length === 6) {
      verifyOtp();
    }
  }, [otp]);

  // Reset password locally
  const resetPassword = () => {
    if (!Object.values(passwordValid).every(Boolean)) {
      alert("Password does not meet requirements");
      return;
    }
    if (!isPasswordMatch) {
      alert("Passwords do not match");
      return;
    }
    alert("Password reset successful!");
    router.push("/LandingPage");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.title}>Forgot Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={sending}>
            <Text style={styles.buttonText}>{sending ? "Sending..." : "Send OTP"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.link}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.title}>Enter OTP</Text>
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
              <Text>Resend OTP in {resendTimer}s</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={sendOtp}>
              <Text>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {step === 3 && (
        <View style={styles.card}>
          <Text style={styles.title}>Reset Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Text>{passwordVisible ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ color: passwordValid.length ? "green" : "red" }}>
              • Minimum 8 characters
            </Text>
            <Text style={{ color: passwordValid.upper ? "green" : "red" }}>
              • Uppercase letter
            </Text>
            <Text style={{ color: passwordValid.lower ? "green" : "red" }}>
              • Lowercase letter
            </Text>
            <Text style={{ color: passwordValid.number ? "green" : "red" }}>
              • Number
            </Text>
            <Text style={{ color: passwordValid.special ? "green" : "red" }}>
              • Special character (!@#$%^&*)
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {!isPasswordMatch && confirmPassword && (
            <Text style={{ color: "red" }}>Passwords do not match</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            disabled={!Object.values(passwordValid).every(Boolean) || !isPasswordMatch}
            onPress={resetPassword}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  card: { width: "100%", backgroundColor: "#fff", padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: "#2ecc71", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { color: "#2980b9", textAlign: "center", marginTop: 10 },
  otpWrapper: { flexDirection: "row", justifyContent: "space-between" },
  otpBox: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, textAlign: "center", width: 40 },
  passwordWrapper: { flexDirection: "row", alignItems: "center" },
});

export default ForgetPassword;
