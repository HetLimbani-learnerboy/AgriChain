import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./GetStartedPage.css";

const GetStartedPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [roleOpen, setRoleOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const roleRef = useRef(null);
  const langRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) setRoleOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="navbar-left">
          <img src="/MainLogo.png" alt="logo" className="navbar-logo" />
          <span className="navbar-title">AgriChain</span>
        </div>
        <div className="navbar-right">
          {/* Role Dropdown */}
          <div className="role-dropdown" ref={roleRef}>
            <button
              className="role-button"
              aria-haspopup="true"
              aria-expanded={roleOpen}
              onClick={() => setRoleOpen((p) => !p)}
            >
              Role ▾
            </button>
            <div className={`dropdown-menulist ${roleOpen ? "show" : ""}`} role="menu">
              <button onClick={() => navigate("/farmer")}>Farmer</button>
              <button onClick={() => navigate("/distributor")}>Distributor</button>
              <button onClick={() => navigate("/retailer")}>Retailer</button>
              <button onClick={() => navigate("/consumer")}>Consumer</button>
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="language-dropdown" ref={langRef}>
            <button
              className="language-button"
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((p) => !p)}
            >
              Language ▾
            </button>
            <div className={`dropdown-languagelist ${langOpen ? "show" : ""}`} role="menu">
              <button onClick={() => changeLanguage("en")}>English</button>
              <button onClick={() => changeLanguage("hi")}>Hindi</button>
              <button onClick={() => changeLanguage("gu")}>Gujarati</button>
            </div>
          </div>

          {/* Sign In / Sign Up */}
          <button className="auth-btn" onClick={() => navigate("/signin")}>Sign In</button>
          <button className="auth-btn signup" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </nav>

      {/* Main Content */}
      <header className="landing-header">
        <h1>{t("welcome")} to AgriChain 🌾</h1>
        <p>
          {t("title") || "AgriChain connects farmers, distributors, retailers, and consumers seamlessly, bringing transparency and efficiency to the agricultural supply chain."}
        </p>
      </header>

      {/* Government Section */}
      <section className="landing-government">
        <h2>Government Collaboration</h2>
        <p>
          AgriChain allows government agencies to integrate directly with the supply chain ecosystem.
          This ensures proper monitoring of agricultural resources, subsidies, and quality standards.
          Farmers can access government schemes, track compliance, and report issues transparently.
        </p>
        <p>
          By connecting with AgriChain, government departments can reduce bureaucracy, increase
          accountability, and support sustainable agricultural practices nationwide.
        </p>
        <button className="gov-learnmore-btn" onClick={() => navigate("/government")}>
          Learn More
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 AgriChain. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GetStartedPage;
