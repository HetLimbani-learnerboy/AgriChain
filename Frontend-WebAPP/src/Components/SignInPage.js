import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="signin-page">
      {/* Header same as dashboard */}
      <div className="navigator-bar-container">
        <img src="/MainLogo.png" alt="logo" className="logo" />
        <span>AgriChain</span>
        <div className="navigator-bar-links">
          <button onClick={() => navigate("/maindashboardpage")}>Dashboard</button>
          <button>Transactions</button>
          <div className="role-dropdown">
            <button className="role-button">Role ▾</button>
          </div>
          <button>Profile</button>
        </div>
      </div>

      {/* SignIn Form */}
      <div className="signin-container">
        <h2>Sign In</h2>
        <form>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="signin-btn">Sign In</button>
          <button type="button" className="google-btn">
            <img src="/GoogleLogo.png" alt="Google" />
            Sign In with Google
          </button>
        </form>
        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
