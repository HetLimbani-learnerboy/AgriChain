import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

type Role = "Farmer" | "Distributor" | "Retailer" | "Consumer";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: Role;
}

interface PasswordValid {
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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "Farmer",
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<PasswordValid>({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
    match: false,
  });

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value });
    setPasswordValid({
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[!@#$%^&*]/.test(value),
      match: value === formData.confirmPassword,
    });
  };

  const handleConfirmPasswordChange = (value: string) => {
    setFormData({ ...formData, confirmPassword: value });
    setPasswordValid({ ...passwordValid, match: value === formData.password });
  };

  const handleSignupSubmit = async () => {
    if (!passwordValid.match) {
      alert("Passwords do not match!");
      return;
    }
    // backend signup call here
    setStep(2);
  };

  const handleOtpSubmit = async () => {
    // backend OTP verification
    alert("OTP Verified ✅");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.signupWrapper}>
        {step === 1 && (
          <View style={styles.signupForm}>
            <Text style={styles.title}>Create Your Account</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />

            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                value={formData.password}
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                {/* You can add eye icon here */}
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
              value={formData.confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
            <Text style={{ color: passwordValid.match ? "green" : "red" }}>
              • Passwords match
            </Text>

            <Picker
              selectedValue={formData.role}
              onValueChange={(itemValue: string) =>
                setFormData({ ...formData, role: itemValue as Role })
              }
              style={styles.input}
            >
              <Picker.Item label="Farmer" value="Farmer" />
              <Picker.Item label="Distributor" value="Distributor" />
              <Picker.Item label="Retailer" value="Retailer" />
              <Picker.Item label="Consumer" value="Consumer" />
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignupSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Sign In link */}
            <TouchableOpacity
              style={styles.linkWrapper}
              onPress={() => router.push("/signinPage")}
            >
              <Text style={styles.switchText}>
                Already have an account? <Text style={styles.link}>Sign In</Text>
              </Text>
            </TouchableOpacity>

            {/* Back to home link */}
            <TouchableOpacity
              style={styles.linkWrapper}
              onPress={() => router.push("/LandingPage")}
            >
              <Text style={styles.switchText}>
                <Text style={styles.link}>Back to Home</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View style={styles.otpForm}>
            <Text style={styles.title}>Verify Your Email</Text>
            <Text>Enter OTP sent to {formData.email}</Text>
            <TextInput
              style={styles.input}
              placeholder="OTP"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  signupWrapper: {
    width: "100%",
  },
  signupForm: {
    width: "100%",
  },
  otpForm: {
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    textAlign: "center",
    fontSize: 14,
  },
  linkWrapper: {
    marginTop: 10,
  },
  link: {
    color: "#2980b9",
    fontWeight: "bold",
  },
});
