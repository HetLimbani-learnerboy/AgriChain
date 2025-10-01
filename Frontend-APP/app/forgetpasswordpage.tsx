import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useRouter } from "expo-router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  SignIn: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

const ForgetPassword: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();

  // This is the correctly typed ref for an array of TextInput components
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const passwordValid = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };
  const isPasswordMatch = password && password === confirmPassword;

  const handleOtpChange = (value: string, i: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[i] = value;
      setOtp(newOtp);
      // Move to next input if a digit is entered
      if (value && i < 5) {
        otpRefs.current[i + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, i: number) => {
    // Move to previous input on backspace if current is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      // Remember to use your actual IP address for development, not localhost
      const res = await fetch("http://192.168.1.4:3021/signin/forgotpassword/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert("Error", data.message || "Failed to send OTP");
      } else {
        setStep(2);
        setResendTimer(30); // Reset timer on success
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "A network error occurred. Please check your connection.");
    }
    setLoading(false);
  };
  
  useEffect(() => {
    if (step === 2 && resendTimer > 0) {
      const interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer, step]);

  useEffect(() => {
    if (otp.join("").length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://192.168.1.4:3021/signin/forgotpassword/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.join("") }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
      } else {
        Alert.alert("Error", data.message || "Invalid OTP");
        setOtp(Array(6).fill("")); // Clear OTP on failure
        otpRefs.current[0]?.focus();
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong during verification.");
    }
    setLoading(false);
  };

  const resetPassword = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://192.168.1.4:3021/signin/forgotpassword/reset", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.join(""), password }),
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", data.message || "Password reset successful!", [
          { text: "OK", onPress: () => navigation.navigate("SignIn") },
        ]);
      } else Alert.alert("Error", data.message || "Failed to reset password");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.title}>Forgot Password</Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send OTP</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/signinPage")}>
            <Text style={styles.back}>Go Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>An OTP has been sent to {email}</Text>
          <View style={styles.otpWrapper}>
            {otp.map((d, i) => (
              <TextInput
                key={i}
                ref={(el) => {
                  if (el) otpRefs.current[i] = el;
                }}
                value={d}
                onChangeText={(val) => handleOtpChange(val, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.otpBox}
              />
            ))}
          </View>
          {loading && <ActivityIndicator style={{ marginVertical: 10 }} />}
          {resendTimer > 0 ? (
            <Text style={styles.resendDisabled}>Resend OTP in {resendTimer}s</Text>
          ) : (
            <TouchableOpacity onPress={sendOtp} disabled={loading}>
              <Text style={styles.resend}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {step === 3 && (
        <View style={styles.card}>
          <Text style={styles.title}>Reset Password</Text>
          <View style={{ width: '100%', flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, marginVertical: 6 }}>
            <TextInput
              placeholder="New Password"
              secureTextEntry={!passwordVisible}
              style={[styles.input, { borderWidth: 0, padding: 0, flex: 1 }]}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Text style={styles.toggle}>{passwordVisible ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.validation}>
            <Text style={{ color: passwordValid.length ? "green" : "red" }}>• Minimum 8 characters</Text>
            <Text style={{ color: passwordValid.upper ? "green" : "red" }}>• Uppercase letter</Text>
            <Text style={{ color: passwordValid.lower ? "green" : "red" }}>• Lowercase letter</Text>
            <Text style={{ color: passwordValid.number ? "green" : "red" }}>• Number</Text>
            <Text style={{ color: passwordValid.special ? "green" : "red" }}>• Special character (!@#$%^&*)</Text>
          </View>

          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {!isPasswordMatch && confirmPassword ? <Text style={styles.validationMessage}>Passwords do not match</Text> : null}

          <TouchableOpacity
            style={[styles.button, { marginTop: 10, opacity: (!Object.values(passwordValid).every(Boolean) || !isPasswordMatch) ? 0.5 : 1 }]}
            disabled={!Object.values(passwordValid).every(Boolean) || !isPasswordMatch || loading}
            onPress={resetPassword}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdfbf5",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 14,
    backgroundColor: "#166534",
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  back: {
    marginTop: 16,
    color: "#166534",
    fontWeight: "bold",
  },
  otpWrapper: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  otpBox: {
    width: 45,
    height: 50,
    fontSize: 20,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  toggle: {
    color: "#166534",
    fontWeight: "bold",
  },
  validation: {
    alignSelf: "flex-start",
    width: '100%',
    marginTop: 8,
    marginBottom: 6,
  },
  validationMessage: {
    alignSelf: "flex-start",
    color: "red",
    marginBottom: 6,
  },
  resend: {
    color: "#166534",
    fontWeight: "bold",
    marginTop: 12,
  },
  resendDisabled: {
    color: "#888",
    marginTop: 12,
  },
});