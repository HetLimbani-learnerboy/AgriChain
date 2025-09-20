import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((p) => !p);

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="signin-wrapper">
      <section className="signin-left">
        <div className="signin-card animate-slide">
          <h2 className="form-title">Sign In</h2>

          <form onSubmit={handleSubmit} className="signin-form">
            <label>Email Address</label>
            <input type="email" required autoComplete="email" />

            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src={showPassword ? "/Images/eye_open.png" : "/Images/eye-close.svg"}
                  alt={showPassword ? "Hide password" : "Show password"}
                />
              </button>
            </div>

            <button type="submit" className="signin-btn">Sign In</button>

            <button type="button" className="google-btn">
              <img src="/GoogleLogo.png" alt="Google" />
              Sign In with Google
            </button>
          </form>

          <span
            className="forget-password"
            onClick={() => navigate("/forgetpasswordpage")}
          >
            Forgot Password?
          </span>

          <p className="switch-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signuppage")}>Sign Up</span>
          </p>
          <p className="switch-text-back">
           <span onClick={() => navigate("/")}>Back to home</span>
          </p>
        </div>
      </section>

      <section className="signin-right">
        <div className="branding">
          <img src="/MainLogo.png" alt="AgriChain" />
          <h1>Welcome Back to AgriChain</h1>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
