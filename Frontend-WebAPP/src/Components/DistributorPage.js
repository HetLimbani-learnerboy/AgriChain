import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./DistributorPagestyle.css";

const DistributorPage = () => {
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
    <div className="distributor-dashboard-webapp">
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

      {/* Distributor Page Content */}
      <div className="distributor-dashboard-content">
        <h2>Distributor Dashboard</h2>
        <p>Manage logistics, transport, and storage efficiently.</p>

        <div className="distributor-sections">
          <div className="distributor-card">
            <img src="/Images/png5_ip.png" alt="Incoming Produce" />
            <div className="distributor-card-body">
              <h3>Incoming Produce</h3>
              <p>Check all produce arriving from farmers before transport.</p>
            </div>
          </div>

          <div className="distributor-card">
            <img src="/Images/png6_ts.png" alt="Transport Storage" />
            <div className="distributor-card-body">
              <h3>Update Transport & Storage</h3>
              <p>Track pickup dates, storage temperatures, and delivery status.</p>
            </div>
          </div>

          <div className="distributor-card">
            <img src="/Images/png7_li.png" alt="Logistics Overview" />
            <div className="distributor-card-body">
              <h3>Logistics Overview</h3>
              <p>View current shipments, transport routes, and pending deliveries.</p>
            </div>
          </div>

          <div className="distributor-card">
            <img src="/Images/png8_mi.png" alt="Market Insights" />
            <div className="distributor-card-body">
              <h3>Market Insights</h3>
              <p>Get updates on market demand, pricing trends, and forecasts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorPage;
