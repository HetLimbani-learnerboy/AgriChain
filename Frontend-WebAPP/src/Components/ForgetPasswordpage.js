import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1-email, 2-OTP, 3-reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const otpRefs = useRef([]);

  const passwordValid = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };
  const isPasswordMatch = password && password === confirmPassword;

  // Handle OTP input
  const handleOtpChange = (value, i) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[i] = value;
      setOtp(newOtp);
      if (value && i < 5) otpRefs.current[i + 1].focus();
    }
  };

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:3021/signin/forgotpassword/auth", { email });
      setStep(2);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (step === 2 && otp.join("").length === 6) {
      const timer = setTimeout(() => setStep(3), 1000); // auto proceed after 1 sec
      return () => clearTimeout(timer);
    }
  }, [otp, step]);

  const resetPassword = async () => {
    try {
      await axios.patch("http://localhost:3021/signin/forgotpassword", {
        email,
        otp: otp.join(""),
        password,
      });
      alert("Password reset successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="wrapper">
      {step === 1 && (
        <div className="card">
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn" onClick={sendOtp}>Send OTP</button>
          <span className="back" onClick={() => navigate(-1)}>Go Back</span>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2>Enter OTP</h2>
          <div className="otp-wrapper">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                value={d}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                maxLength={1}
                className="otp-box"
              />
            ))}
          </div>
          <p>OTP will be verified automatically</p>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2>Reset Password</h2>
          <div className="input-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="New Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="toggle-btn" onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <div className="validation">
            <p style={{ color: passwordValid.length ? "green" : "red" }}>• Minimum 8 characters</p>
            <p style={{ color: passwordValid.upper ? "green" : "red" }}>• Uppercase letter</p>
            <p style={{ color: passwordValid.lower ? "green" : "red" }}>• Lowercase letter</p>
            <p style={{ color: passwordValid.number ? "green" : "red" }}>• Number</p>
            <p style={{ color: passwordValid.special ? "green" : "red" }}>• Special character (!@#$%^&*)</p>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!isPasswordMatch && confirmPassword && <p style={{ color: "red" }}>Passwords do not match</p>}

          <button
            className="btn"
            disabled={!Object.values(passwordValid).every(Boolean) || !isPasswordMatch}
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
