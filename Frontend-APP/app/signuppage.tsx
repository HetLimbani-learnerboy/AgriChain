import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { url } from "../utils/basicUtils";

type Role = "Farmer" | "Distributor" | "Retailer" | "Consumer";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: Role;
}

interface PasswordValidations {
  length: boolean;
  upper: boolean;
  lower: boolean;
  number: boolean;
  special: boolean;
  match: boolean;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [userId, setUserId] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "Farmer",
  });

  const [passwordValid, setPasswordValid] = useState<PasswordValidations>({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
    match: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [apiError, setApiError] = useState<string>("");

  // --- Input Handlers ---
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
    if (apiError) setApiError("");
  };

  const handlePasswordChange = (value: string) => {
    handleInputChange("password", value);
    setPasswordValid({
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[!@#$%^&*]/.test(value),
      match: value === formData.confirmPassword && value !== "",
    });
  };

  const handleConfirmPasswordChange = (value: string) => {
    handleInputChange("confirmPassword", value);
    setPasswordValid((prev) => ({
      ...prev,
      match: value === formData.password && value !== "",
    }));
  };

  // --- Validation ---
  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    const allPasswordCriteriaMet = Object.values(passwordValid).every(
      (v) => v === true
    );
    if (!allPasswordCriteriaMet) newErrors.password = "Password is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- API Calls ---
  const handleSignupSubmit = async () => {
    if (!validateStep1()) return;

    setLoading(true);
    setApiError("");

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role.toLowerCase(),
    };

    try {
      const res = await fetch(`${url}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.status === 201) {
        setUserId(data.user.id);
        setStep(2);
      } else setApiError(data.message || "Signup failed");
    } catch (err) {
      console.error(err);
      setApiError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setApiError("Invalid OTP");
      return;
    }
    setLoading(true);
    setApiError("");

    try {
      const res = await fetch(`${url}/signup/verify/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (res.status === 200) {
        Alert.alert("Success", "Account verified", [
          { text: "OK", onPress: () => router.push("/signinPage") },
        ]);
      } else setApiError(data.message || "OTP verification failed");
    } catch (err) {
      console.error(err);
      setApiError("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const passwordCriteria = [
    { label: "Min 8 characters", valid: passwordValid.length },
    { label: "Uppercase letter", valid: passwordValid.upper },
    { label: "Lowercase letter", valid: passwordValid.lower },
    { label: "Number", valid: passwordValid.number },
    { label: "Special character (!@#$%^&*)", valid: passwordValid.special },
    { label: "Passwords match", valid: passwordValid.match },
  ];

  const renderSignupForm = () => (
    <>
      <Text style={styles.title}>Create Your Account</Text>
      {apiError ? <Text style={styles.apiErrorText}>{apiError}</Text> : null}

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={[styles.passwordWrapper, errors.password && styles.inputError]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={formData.password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity
          style={styles.togglePassword}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Image
            source={
              passwordVisible
                ? require("../assets/Images/eye_open.png")
                : require("../assets/Images/eye-close.png")
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, (errors.password || !passwordValid.match) && styles.inputError]}
        placeholder="Confirm Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <View style={styles.passwordRules}>
        {passwordCriteria.map((item, idx) => (
          <Text
            key={idx}
            style={{ color: item.valid ? "#2e7d32" : "#c62828", fontSize: 14, marginVertical: 2 }}
          >
            {item.valid ? "✓" : "•"} {item.label}
          </Text>
        ))}
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.role}
          onValueChange={(itemValue) => handleInputChange("role", itemValue as Role)}
        >
          <Picker.Item label="Farmer" value="Farmer" />
          <Picker.Item label="Distributor" value="Distributor" />
          <Picker.Item label="Retailer" value="Retailer" />
          <Picker.Item label="Consumer" value="Consumer" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSignupSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signinPage")}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </>
  );

  const renderOtpForm = () => (
    <>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>Enter OTP sent to <Text style={{ fontWeight: "bold" }}>{formData.email}</Text></Text>
      {apiError && <Text style={styles.apiErrorText}>{apiError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleOtpSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setStep(1)}>
        <Text style={styles.link}>Go Back</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>{step === 1 ? renderSignupForm() : renderOtpForm()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: "#fdfbf5" },
  formWrapper: { backgroundColor: "#fff", padding: 25, borderRadius: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  title: { fontSize: 26, fontWeight: "bold", color: "#166534", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "black", textAlign: "center", marginBottom: 20, paddingHorizontal: 10 },
  input: { height: 50, borderColor: "#ddd", borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginTop: 15, backgroundColor: "#fafafa" },
  inputError: { borderColor: "#c62828", borderWidth: 1.5 },
  passwordWrapper: { flexDirection: "row", alignItems: "center", borderColor: "#ddd", borderWidth: 1, borderRadius: 8, marginTop: 15, backgroundColor: "#fafafa" },
  passwordInput: { flex: 1, height: 50, paddingHorizontal: 15, fontSize: 16, borderWidth: 0 },
  togglePassword: { paddingHorizontal: 10 },
  eyeIcon: { width: 22, height: 22 },
  passwordRules: { marginTop: 10, marginBottom: 5, paddingLeft: 5 },
  pickerContainer: { borderColor: "#ddd", borderWidth: 1, borderRadius: 8, marginTop: 15, backgroundColor: "#fafafa" },
  button: { backgroundColor: "#166534", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  link: { color: "#166534", textAlign: "center", marginTop: 20, fontSize: 16, fontWeight: "500" },
  errorText: { color: "#c62828", fontSize: 12, marginTop: 5, paddingLeft: 5 },
  apiErrorText: { color: "#c62828", fontSize: 14, textAlign: "center", marginBottom: 10, fontWeight: "bold" },
});

export default SignUp;
