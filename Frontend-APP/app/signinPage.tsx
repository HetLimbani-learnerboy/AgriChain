import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");

type RootStackParamList = {
  SignIn: undefined;
  ForgetPassword: undefined;
  SignUp: undefined;
  CommonDashboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

const SignIn: React.FC<Props> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const togglePassword = () => setShowPassword((p) => !p);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3021/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Login successful!", [
          { text: "OK", onPress: () => navigation.navigate("CommonDashboard") },
        ]);
      } else {
        Alert.alert("Error", data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Left Section */}
      <View style={styles.signinLeft}>
        <View style={[styles.signinCard]}>
          <Text style={styles.formTitle}>Sign In</Text>

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoComplete="email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordField}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
            />
            <TouchableOpacity
              style={styles.togglePassword}
              onPress={togglePassword}
            >
              <Image
                source={
                  showPassword
                    ? require("../assets/Images/eye_open.png")
                    : require("../assets/Images/eye-close.png")
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signinBtn} onPress={handleSubmit}>
            <Text style={styles.signinBtnText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/Forgetpasswordpage")}
          >
            <Text style={styles.forgetPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.switchText}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/signuppage")}>
              <Text style={styles.switchLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.switchTextBack}>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.switchLink}>Back to home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fdfbf5",
    flexDirection: width > 900 ? "row" : "column",
    minHeight: "100%",
  },
  signinLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  signinCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 5,
    alignItems: "center",
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  passwordField: {
    width: "100%",
    position: "relative",
    marginBottom: 12,
  },
  togglePassword: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  eyeIcon: {
    width: 22,
    height: 22,
  },
  signinBtn: {
    width: "100%",
    backgroundColor: "#166534",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  signinBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgetPassword: {
    color: "#166534",
    alignSelf: "flex-end",
    marginBottom: 12,
    fontWeight: "bold",
  },
  switchText: {
    flexDirection: "row",
    marginBottom: 8,
  },
  switchTextBack: {
    marginTop: 4,
    flexDirection: "row",
  },
  switchLink: {
    color: "#166534",
    fontWeight: "bold",
  },
});
