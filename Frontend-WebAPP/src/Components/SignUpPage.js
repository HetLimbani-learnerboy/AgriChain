import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-page">
      {/* Header same as dashboard */}
      <div className="navigator-bar-container">
        <img src="/MainLogo.png" alt="logo" className="logo" />
        <span>AgriChain</span>
        <div className="navigator-bar-links">
          <button onClick={() => navigate("/")}>Dashboard</button>

        </div>
      </div>

      {/* SignUp Form */}
      <div className="signup-container">
        <h2>Create Your Account</h2>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit" className="signup-btn">Sign Up</button>
          <button type="button" className="google-btn">
            <img src="//GoogleLogo.png" alt="Google" />
            Sign Up with Google
          </button>
        </form>
        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/signinpage")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
