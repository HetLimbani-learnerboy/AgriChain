import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./RetailerPagestyle.css";

const RetailerPage = () => {
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
    <div className="retailer-dashboard-webapp">
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


      {/* Retailer Page Content */}
      <div className="retailer-dashboard-content">
        <h2>Retailer Dashboard</h2>
        <p>Manage your stock, pricing, sales, and generate QR codes for consumers.</p>

        <div className="retailer-sections">
          <div className="retailer-card">
            <img src="/Images/png9_rp.png" alt="Received Produce" />
            <div className="retailer-card-body">
              <h3>Received Produce</h3>
              <p>View all produce received from distributors and check status.</p>
            </div>
          </div>

          <div className="retailer-card">
            <img src="/Images/png10_fs.png" alt="Add Price & Stock" />
            <div className="retailer-card-body">
              <h3>Add Final Price & Stock</h3>
              <p>Update stock quantities and set final selling price for each crop.</p>
            </div>
          </div>

          <div className="retailer-card">
            <img src="/Images/png11_gq.png" alt="Generate QR Code" />
            <div className="retailer-card-body">
              <h3>Generate QR Code</h3>
              <p>Create QR codes for consumers to track products and verify authenticity.</p>
            </div>
          </div>

          <div className="retailer-card">
            <img src="/Images/png12_so.png" alt="Sales Overview" />
            <div className="retailer-card-body">
              <h3>Sales Overview</h3>
              <p>Check sales performance and basic charts to analyze trends.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerPage;
