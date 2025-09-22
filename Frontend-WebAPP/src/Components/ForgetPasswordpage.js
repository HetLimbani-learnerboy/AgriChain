import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const navigate = useNavigate();

  // Step: 1-email, 2-OTP, 3-reset password
  const [step, setStep] = useState(1);

  // OTP state
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const otpRefs = useRef([]);

  // Password state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Password validation
  const passwordValid = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  // Check if confirm password matches
  const isPasswordMatch = password && password === confirmPassword;

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) otpRefs.current[index + 1].focus();
    }
  };

  // Check OTP
  const isOtpValid = otp.join("").length === 6;

  // Simulate OTP verification after 1 second
  useEffect(() => {
    if (step === 2 && isOtpValid) {
      const timer = setTimeout(() => setStep(3), 1000);
      return () => clearTimeout(timer);
    }
  }, [otp, step]);

  return (
    <div className="page-wrapper">
      {step === 1 && (
        <div className="card">
          <h2 className="title">Forgot Password</h2>
          <input type="email" placeholder="Enter your email" className="input" />
          <button className="btn" onClick={() => setStep(2)}>Send OTP</button>
          <span className="back" onClick={() => navigate(-1)}>Go Back</span>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2 className="title">Enter OTP</h2>
          <div className="otp-wrapper">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                value={digit}
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
          <h2 className="title">Reset Password</h2>
          <div className="input-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
          {!isPasswordMatch && confirmPassword && <p style={{ color: "red" }}>Passwords do not match</p>}

          <button
            className="btn"
            disabled={!Object.values(passwordValid).every(Boolean) || !isPasswordMatch}
            onClick={() => navigate("/dashboard")}
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
