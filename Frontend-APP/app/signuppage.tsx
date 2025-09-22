import React, { useState, ChangeEvent, FormEvent } from "react";
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

interface PasswordValid {
  length: boolean;
  upper: boolean;
  lower: boolean;
  number: boolean;
  special: boolean;
  match: boolean;
}

const SignUp: React.FC = () => {
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

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, confirmPassword: value });
    setPasswordValid({ ...passwordValid, match: value === formData.password });
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordValid.match) return alert("Passwords do not match!");
    try {
      const res = await fetch(url + "/signup", {
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
        const res1 = await fetch(url + `/signup/verify/${data.user.id}`, {
          method: "GET",
        });
        if (res1.status === 201) {
          setStep(2);
        } else {
          alert(data.message || "Failed to send OTP");
        }
      } else {
        alert(data.message || "Error creating user");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(url + `/signup/verify/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (res.status === 200) {
        window.location.href = "http://localhost:3000/dashboard";
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="signin-wrapper">
      <style>{`
        .signin-wrapper {
          display: flex;
          min-height: 100vh;
          font-family: Inter, sans-serif;
          background: #fdfbf5;
        }
        .signin-left, .signup-left {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          flex-direction: column;
          text-align: center;
        }
        .signin-card, .signup-form, .otp-form {
          background: #ffffff;
          width: 100%;
          max-width: 420px;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
          padding: 2rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 3rem 0; /* <-- Add this line for top and bottom margin */

        }
        .signin-form input, .signup-form input, .otp-form input, select {
          width: 92%;
          padding: 0.8rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border 0.3s;
        }
        .signin-form input:focus, .signup-form input:focus, .otp-form input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 2px #bbf7d0;
        }
        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .toggle-password-img {
          position: absolute;
          right: 0.8rem;
          cursor: pointer;
          width: 22px;
          height: 22px;
        }
        .signup-btn {
          padding: 0.9rem;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 8px;
          background: #166534;
          color: white;
          border: none;
          transition: transform 0.2s ease;
        }
        .signup-btn:hover {
          transform: scale(1.02);
        }
        .password-rules p {
          margin: 0;
          font-size: 0.9rem;
        }
        .signup-switch-text, .signup-switch-text-back {
          text-align: center;
          margin-top: 1rem;
          font-size: 1rem;
        }
        .signup-switch-text a, .signup-switch-text-back a {
          color: #166534;
          font-weight: bold;
        }
      @media (max-width: 900px) {
  .signup-left {
    justify-content: center;  /* horizontal centering */
    align-items: center;      /* vertical centering */
    min-height: 100vh;        /* full screen height */
    padding: 3rem 1em;
  }

  .signup-form, .otp-form {
    max-width: 90%;
    margin: 2rem 0;    /* margin from top and bottom */
  }

}

      `}</style>

      <div className="signup-left">
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
              <p style={{ color: passwordValid.match ? "green" : "red" }}>• Passwords match</p>
            </div>

            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
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
              Already have an account? <a href="/signin">Sign In</a>
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
