import React, { useState } from "react";
import "./SignUpPage.css";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "Farmer",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
    match: false,
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
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

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, confirmPassword: value });
    setPasswordValid({ ...passwordValid, match: value === formData.password });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!passwordValid.match) return alert("Passwords do not match!");
    try {
      const res = await fetch("http://localhost:3021/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role.toLowerCase(),
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setUserId(data.user.id);
        const res1 = await fetch(`http://localhost:3021/signup/verify/${data.user.id}`,{
          method:"GET"
        })
        if(res1.status === 201){
            setStep(2);
            alert(`OTP sent to ${formData.email} otp is valid for 5 minutes`);
        }else {
        alert(data.message || "faild to send otp");
        }
        
      } else {
        alert(data.message || "Error creating user");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3021/signup/verify/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (res.status === 200) {
        alert("Signup successful! Redirecting to dashboard...");
        window.location.href = "http://localhost:3021/distributorpage"; // Redirect to dashboard
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <img src="/MainLogo.png" alt="AgriChain Logo" className="logo-signup" />
        <h1>Welcome to AgriChain</h1>
        <p>Experience blockchain-powered agriculture transparency.</p>
      </div>

      <div className="signup-right">
        {step === 1 && (
          <form onSubmit={handleSignupSubmit} className="signup-form">
            <h2>Create Your Account</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <div className="password-wrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
              />
              <img
                src={passwordVisible ? "/Images/eye_open.png" : "/Images/eye-close.svg"}
                alt="toggle password"
                className="toggle-password-img"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            </div>

            <div className="password-rules">
              <p style={{ color: passwordValid.length ? "green" : "red" }}>• Minimum 8 characters</p>
              <p style={{ color: passwordValid.upper ? "green" : "red" }}>• Uppercase letter</p>
              <p style={{ color: passwordValid.lower ? "green" : "red" }}>• Lowercase letter</p>
              <p style={{ color: passwordValid.number ? "green" : "red" }}>• Number</p>
              <p style={{ color: passwordValid.special ? "green" : "red" }}>• Special character (!@#$%^&*)</p>
              
            </div>

            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
             <div className="password-rules">
            <p style={{ color: passwordValid.match ? "green" : "red" }}>• Passwords match</p> </div>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="Farmer">Farmer</option>
              <option value="Distributor">Distributor</option>
              <option value="Retailer">Retailer</option>
              <option value="Consumer">Consumer</option>
            </select>
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <button type="submit" className="signup-btn">Sign Up</button>
            <span className="signup-switch-text">
              Already have an account? <a href="/signinpage">Sign In</a>
            </span>
            <span className="signup-switch-text-back">
              <a href="/">Back to home</a>
            </span>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="otp-form">
            <h2>Verify Your Email</h2>
            <p>Enter OTP sent to {formData.email}</p>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="signup-btn">Verify OTP</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
