import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        Alert.alert(
          "Success",
          "Password reset instructions sent to your email."
        );
        router.push("/signinPage");
      } else {
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to process request.");
    }
  };

  return (
    <View style={styles.container}>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your registered email address below to receive reset
          instructions.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetText}>Send Reset Link</Text>
        </TouchableOpacity>

        <Text style={styles.switchText}>
          Remembered your password?{" "}
          <Text
            style={styles.switchLink}
            onPress={() => router.push("/signinPage")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbf5",
  },
  navbar: {
    backgroundColor: "#f0fdf4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  brand: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
  },
  navLink: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#15803d",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#374151",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  resetBtn: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  resetText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },
  switchLink: {
    color: "#16a34a",
    fontWeight: "bold",
  },
});
