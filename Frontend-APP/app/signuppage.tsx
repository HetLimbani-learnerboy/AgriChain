// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useRouter } from "expo-router";

// type Role = "Farmer" | "Distributor" | "Retailer" | "Consumer";

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   phone: string;
//   role: Role;
// }

// interface PasswordValid {
//   length: boolean;
//   upper: boolean;
//   lower: boolean;
//   number: boolean;
//   special: boolean;
//   match: boolean;
// }

// const SignUp: React.FC = () => {
//   const router = useRouter();
//   const [step, setStep] = useState<number>(1);
//   const [userId, setUserId] = useState<string>("");
//   const [otp, setOtp] = useState<string>("");
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     role: "Farmer",
//   });
//   const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
//   const [passwordValid, setPasswordValid] = useState<PasswordValid>({
//     length: false,
//     upper: false,
//     lower: false,
//     number: false,
//     special: false,
//     match: false,
//   });

//   const handlePasswordChange = (value: string) => {
//     setFormData({ ...formData, password: value });
//     setPasswordValid({
//       length: value.length >= 8,
//       upper: /[A-Z]/.test(value),
//       lower: /[a-z]/.test(value),
//       number: /[0-9]/.test(value),
//       special: /[!@#$%^&*]/.test(value),
//       match: value === formData.confirmPassword,
//     });
//   };

//   const handleConfirmPasswordChange = (value: string) => {
//     setFormData({ ...formData, confirmPassword: value });
//     setPasswordValid({ ...passwordValid, match: value === formData.password });
//   };

//   const handleSignupSubmit = async () => {
//     if (!passwordValid.match) {
//       alert("Passwords do not match!");
//       return;
//     }
//     // backend signup call here
//     setStep(2);
//   };

//   const handleOtpSubmit = async () => {
//     // backend OTP verification
//     alert("OTP Verified ✅");
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.signupWrapper}>
//         {step === 1 && (
//           <View style={styles.signupForm}>
//             <Text style={styles.title}>Create Your Account</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Full Name"
//               value={formData.name}
//               onChangeText={(text) => setFormData({ ...formData, name: text })}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               keyboardType="email-address"
//               value={formData.email}
//               onChangeText={(text) => setFormData({ ...formData, email: text })}
//             />

//             <View style={styles.passwordWrapper}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry={!passwordVisible}
//                 value={formData.password}
//                 onChangeText={handlePasswordChange}
//               />
//               <TouchableOpacity
//                 onPress={() => setPasswordVisible(!passwordVisible)}
//               >
//                 {/* You can add eye icon here */}
//               </TouchableOpacity>
//             </View>

//             <View>
//               <Text style={{ color: passwordValid.length ? "green" : "red" }}>
//                 • Minimum 8 characters
//               </Text>
//               <Text style={{ color: passwordValid.upper ? "green" : "red" }}>
//                 • Uppercase letter
//               </Text>
//               <Text style={{ color: passwordValid.lower ? "green" : "red" }}>
//                 • Lowercase letter
//               </Text>
//               <Text style={{ color: passwordValid.number ? "green" : "red" }}>
//                 • Number
//               </Text>
//               <Text style={{ color: passwordValid.special ? "green" : "red" }}>
//                 • Special character (!@#$%^&*)
//               </Text>
//             </View>

//             <TextInput
//               style={styles.input}
//               placeholder="Confirm Password"
//               secureTextEntry
//               value={formData.confirmPassword}
//               onChangeText={handleConfirmPasswordChange}
//             />
//             <Text style={{ color: passwordValid.match ? "green" : "red" }}>
//               • Passwords match
//             </Text>

//             <Picker
//               selectedValue={formData.role}
//               onValueChange={(itemValue: string) =>
//                 setFormData({ ...formData, role: itemValue as Role })
//               }
//               style={styles.input}
//             >
//               <Picker.Item label="Farmer" value="Farmer" />
//               <Picker.Item label="Distributor" value="Distributor" />
//               <Picker.Item label="Retailer" value="Retailer" />
//               <Picker.Item label="Consumer" value="Consumer" />
//             </Picker>

//             <TextInput
//               style={styles.input}
//               placeholder="Phone Number"
//               keyboardType="phone-pad"
//               value={formData.phone}
//               onChangeText={(text) => setFormData({ ...formData, phone: text })}
//             />

//             <TouchableOpacity style={styles.button} onPress={handleSignupSubmit}>
//               <Text style={styles.buttonText}>Sign Up</Text>
//             </TouchableOpacity>

//             {/* Sign In link */}
//             <TouchableOpacity
//               style={styles.linkWrapper}
//               onPress={() => router.push("/signinPage")}
//             >
//               <Text style={styles.switchText}>
//                 Already have an account? <Text style={styles.link}>Sign In</Text>
//               </Text>
//             </TouchableOpacity>

//             {/* Back to home link */}
//             <TouchableOpacity
//               style={styles.linkWrapper}
//               onPress={() => router.push("/LandingPage")}
//             >
//               <Text style={styles.switchText}>
//                 <Text style={styles.link}>Back to Home</Text>
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {step === 2 && (
//           <View style={styles.otpForm}>
//             <Text style={styles.title}>Verify Your Email</Text>
//             <Text>Enter OTP sent to {formData.email}</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="OTP"
//               keyboardType="numeric"
//               value={otp}
//               onChangeText={setOtp}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
//               <Text style={styles.buttonText}>Verify OTP</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f9f9f9",
//   },
//   signupWrapper: {
//     width: "100%",
//   },
//   signupForm: {
//     width: "100%",
//   },
//   otpForm: {
//     width: "100%",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#2c3e50",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//   },
//   passwordWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#2ecc71",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   switchText: {
//     textAlign: "center",
//     fontSize: 14,
//   },
//   linkWrapper: {
//     marginTop: 10,
//   },
//   link: {
//     color: "#2980b9",
//     fontWeight: "bold",
//   },
// });

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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { url } from "../utils/basicUtils";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import "../i18n"; // Import i18n configuration

// --- Type Definitions ---
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
  const { t, i18n } = useTranslation();

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
  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData.name.trim()) newErrors.name = t("FullNameRequired");
    if (!formData.email.trim()) newErrors.email = t("EmailRequired");
    else if (!emailRegex.test(formData.email))
      newErrors.email = t("InvalidEmail");
    if (!formData.phone.trim()) newErrors.phone = t("PhoneRequired");

    const allPasswordCriteriaMet = Object.values(passwordValid).every(
      (v) => v === true
    );
    if (!allPasswordCriteriaMet) newErrors.password = t("PasswordInvalid");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- API ---
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
        const otpRes = await fetch(`${url}/signup/verify/${data.user.id}`, {
          method: "GET",
        });
        const otpData = await otpRes.json();
        if (otpRes.status === 201) setStep(2);
        else setApiError(otpData.message || t("OtpSendFail"));
      } else setApiError(data.message || t("SignupError"));
    } catch (err) {
      console.error(err);
      setApiError(t("ServerError"));
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setApiError(t("OtpInvalid"));
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
        Alert.alert(t("Success"), t("AccountVerified"), [
          { text: "OK", onPress: () => router.push("/signinPage") },
        ]);
      } else setApiError(data.message || t("OtpFail"));
    } catch (err) {
      console.error(err);
      setApiError(t("OtpFail"));
    } finally {
      setLoading(false);
    }
  };
  
  // --- Password Criteria for Rendering ---
  const passwordCriteria = [
    { label: "Minimum 8 characters", valid: passwordValid.length },
    { label: "An uppercase letter (A-Z)", valid: passwordValid.upper },
    { label: "A lowercase letter (a-z)", valid: passwordValid.lower },
    { label: "A number (0-9)", valid: passwordValid.number },
    { label: "A special character (!@#$%^&*)", valid: passwordValid.special },
    { label: "Passwords match", valid: passwordValid.match },
  ];

  // --- Render Functions ---
  const renderSignupForm = () => (
    <>
      <Text style={styles.title}>Create Your AgriChain Account</Text>
      
      {apiError ? <Text style={styles.apiErrorText}>{apiError}</Text> : null}

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
        placeholderTextColor="#888"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        placeholderTextColor="#888"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      
      <View style={[styles.passwordWrapper, errors.password && styles.inputError]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={formData.password}
          onChangeText={handlePasswordChange}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeButton}>
          <Image
            source={passwordVisible ? require("../assets/Images/eye_open.png") : require("../assets/Images/eye-close.png")}
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
        placeholderTextColor="#888"
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <View style={styles.passwordRules}>
        {passwordCriteria.map((item, index) => (
          <Text key={index} style={[styles.ruleText, { color: item.valid ? "#2e7d32" : "#c62828" }]}>
            {item.valid ? "✓" : "•"} {item.label}
          </Text>
        ))}
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.role}
          onValueChange={(itemValue) => handleInputChange("role", itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="I am a Farmer" value="Farmer" />
          <Picker.Item label="I am a Distributor" value="Distributor" />
          <Picker.Item label="I am a Retailer" value="Retailer" />
          <Picker.Item label="I am a Consumer" value="Consumer" />
        </Picker>
      </View>
      
      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder="Phone Number (e.g., +91...)"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
        placeholderTextColor="#888"
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
      <Text style={styles.subtitle}>An OTP has been sent to <Text style={{fontWeight: 'bold'}}>{formData.email}</Text></Text>
      
      {apiError ? <Text style={styles.apiErrorText}>{apiError}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Enter 6-Digit OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        placeholderTextColor="#888"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleOtpSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setStep(1)}>
        <Text style={styles.link}>Go Back</Text>
      </TouchableOpacity>
    </>
  );

  const passwordCriteria = [
    { label: t("Min8Chars"), valid: passwordValid.length },
    { label: t("Uppercase"), valid: passwordValid.upper },
    { label: t("Lowercase"), valid: passwordValid.lower },
    { label: t("Number"), valid: passwordValid.number },
    { label: t("SpecialChar"), valid: passwordValid.special },
    { label: t("PasswordsMatch"), valid: passwordValid.match },
  ];

  // --- Render ---
  const renderSignupForm = () => (
    <>
      <Text style={styles.title}>{t("CreateAccount")}</Text>

      {apiError ? <Text style={styles.apiErrorText}>{apiError}</Text> : null}

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder={t("FullName")}
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder={t("EmailAddress")}
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={[styles.passwordWrapper, errors.password && styles.inputError]}>
        <TextInput
          style={styles.passwordInput}
          placeholder={t("Password")}
          secureTextEntry={!passwordVisible}
          value={formData.password}
          onChangeText={handlePasswordChange}
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

      <TextInput
        style={[styles.input, (errors.password || !passwordValid.match) && styles.inputError]}
        placeholder={t("ConfirmPassword")}
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <View style={styles.passwordRules}>
        {passwordCriteria.map((item, index) => (
          <Text
            key={index}
            style={{ color: item.valid ? "#2e7d32" : "#c62828", fontSize: 14, marginVertical: 2 }}
          >
            {item.valid ? "✓" : "•"} {item.label}
          </Text>
        ))}
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.role}
          onValueChange={(itemValue) => handleInputChange("role", itemValue)}
        >
          <Picker.Item label={t("Farmer")} value="Farmer" />
          <Picker.Item label={t("Distributor")} value="Distributor" />
          <Picker.Item label={t("Retailer")} value="Retailer" />
          <Picker.Item label={t("Consumer")} value="Consumer" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder={t("PhoneNumber")}
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSignupSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t("SignUp")}</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signinPage")}>
        <Text style={styles.link}>{t("AlreadyAccount")}</Text>
      </TouchableOpacity>
    </>
  );

  const renderOtpForm = () => (
    <>
      <Text style={styles.title}>{t("VerifyEmail")}</Text>
      <Text style={styles.subtitle}>{t("OtpSentTo")} <Text style={{ fontWeight: "bold" }}>{formData.email}</Text></Text>

      {apiError ? <Text style={styles.apiErrorText}>{apiError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder={t("EnterOtp")}
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleOtpSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t("VerifyOtp")}</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setStep(1)}>
        <Text style={styles.link}>{t("GoBack")}</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>{step === 1 ? renderSignupForm() : renderOtpForm()}</View>
    </ScrollView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0fdf4", // Light green background
  },
  formWrapper: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#166534", // Dark Green
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 15,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: "#c62828", // Red border for errors
    borderWidth: 1.5,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
    backgroundColor: '#fafafa',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 0, // Remove individual border
  },
  eyeButton: {
    padding: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#888',
  },
  passwordRules: {
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 5,
  },
  ruleText: {
    fontSize: 14,
    lineHeight: 22,
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
    backgroundColor: '#fafafa',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: "#16a34a", // Bright Green
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#15803d", // Medium Green
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500'
  },
  errorText: {
    color: "#c62828",
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 5,
  },
  apiErrorText: {
    color: "#c62828",
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default SignUp;