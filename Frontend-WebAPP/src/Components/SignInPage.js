import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";
import {url} from "../utils/basicUtils";


const SignIn = () => {
const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const togglePassword = () => setShowPassword((p) => !p);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(url+"/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });


      const data = await res.json();
      if (res.ok) {
        // localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else{
        alert(data.message || "Invalid credentials");
        if(res.status===401){
         navigate("/signup");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
};

return ( 
<div className="signin-wrapper"> 
  <section className="signin-left"> 
    <div className="signin-card animate-slide"> 
      <h2 className="form-title">Sign In</h2>

        <form onSubmit={handleSubmit} className="signin-form">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <span onClick={() => navigate("/signup")}>Sign Up</span>
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
