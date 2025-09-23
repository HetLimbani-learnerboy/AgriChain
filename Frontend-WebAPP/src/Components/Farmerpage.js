import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./FarmerPagestyle.css";

const FarmerPage = () => {
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
    <div className="farmer-dashboard-webapp">
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

      {/* Farmer Page Content */}
      <div className="farmer-dashboard-content">
        <h2>Farmer Dashboard</h2>
        <p>Manage your crops, earnings, and market insights.</p>

        <div className="farmer-sections">
          <div className="farmer-card">
            <img src="/Images/png1_ap.png" alt="Add Produce" />
            <div className="farmer-card-body">
              <h3>Add Produce</h3>
              <p>Add new crops with details like crop name, quantity, price, grade, and location.</p>
            </div>
          </div>

          <div className="farmer-card">
            <img src="/Images/png2_pl.png" alt="Produce List" />
            <div className="farmer-card-body">
              <h3>My Produce List</h3>
              <p>Track the status of your crops from Added → Transported → Sold.</p>
            </div>
          </div>

          <div className="farmer-card">
            <img src="/Images/png3_eo.png" alt="Earnings" />
            <div className="farmer-card-body">
              <h3>Earnings Overview</h3>
              <p>View your total earnings, recent transactions, and profit summary.</p>
            </div>
          </div>

          <div className="farmer-card">
            <img src="/Images/png4_mp.png" alt="Market Prices" />
            <div className="farmer-card-body">
              <h3>Market Prices</h3>
              <p>Stay updated with the latest market rates and pricing trends for different crops.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerPage;
