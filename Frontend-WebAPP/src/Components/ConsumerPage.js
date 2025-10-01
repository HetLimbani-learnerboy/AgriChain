import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ConsumerPagestyle.css";

const ConsumerPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [roleOpen, setRoleOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const roleRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleRef.current && !roleRef.current.contains(event.target)) setRoleOpen(false);
      if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  return (
    <div className="consumer-dashboard-webapp">
      {/* Navbar */}
     <nav className="landing-navbar">
        <div className="navbar-left">
          <img src="/MainLogo.png" alt="logo" className="navbar-logo" />
          <span className="navbar-title">AgriChain</span>
        </div>
        <div className="navbar-right">
          <div className="role-dropdown" ref={roleRef}>
            <button className="dashboard-button" onClick={() => navigate('/GetStarted')}>Dashboard</button>
            <button className="role-button" onClick={() => setRoleOpen(p => !p)}>Role ▾</button>
            <div className={`dropdown-menulist ${roleOpen ? "show" : ""}`}>
              <button onClick={() => navigate("/farmer")}>Farmer</button>
              <button onClick={() => navigate("/distributor")}>Distributor</button>
              <button onClick={() => navigate("/retailer")}>Retailer</button>
              <button onClick={() => navigate("/consumer")}>Consumer</button>
            </div>
          </div>

          <div className="language-dropdown" ref={langRef}>
            <button className="language-button" onClick={() => setLangOpen(p => !p)}>Language ▾</button>
            <div className={`dropdown-languagelist ${langOpen ? "show" : ""}`}>
              <button onClick={() => changeLanguage("en")}>English</button>
              <button onClick={() => changeLanguage("hi")}>Hindi</button>
              <button onClick={() => changeLanguage("gu")}>Gujarati</button>
            </div>
          </div>

          <button className="auth-btn-signin" onClick={() => navigate("/signin")}>Sign In</button>
          <button className="auth-btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
          <button className="auth-btn-backbutton" onClick={() => navigate("/")}>Back</button>
        </div>
      </nav>

      <div className="consumer-dashboard-content">
        <h2>Consumer Portal</h2>
        <p>Scan QR codes and track the complete supply chain of your produce.</p>

        <div className="consumer-sections">
          <div className="consumer-card">
            <img src="/Images/png13_tv.png" alt="Traceability View" />
            <div className="consumer-card-body">
              <h3>Traceability View</h3>
              <p>
                Crop → Farmer Details → Transport Info → Retail Price.
                <br />
                Visualized as a timeline or flowchart for easy tracking.
              </p>
            </div>
          </div>

          <div className="consumer-card">
            <img src="/Images/png14_qv.png" alt="QR Code Info" />
            <div className="consumer-card-body">
              <h3>QR Code Verification</h3>
              <p>
                Scan or view QR codes for product authentication and detailed info.
              </p>
            </div>
          </div>

          <div className="consumer-card">
            <img src="/Images/png15_st.png" alt="Sustainability Tips" />
            <div className="consumer-card-body">
              <h3>Sustainability Tips</h3>
              <p>
                Learn about eco-friendly practices and support sustainable agriculture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerPage;
