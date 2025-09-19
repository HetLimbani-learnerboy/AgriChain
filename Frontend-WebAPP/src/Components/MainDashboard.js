import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./MainDashboardstyle.css";

const StatCard = ({ title, value, icon }) => (
  <div className="stat-card">
    <div className="icon">{icon}</div>
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
<<<<<<< HEAD
);

const MainDashboard = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
=======
  </div>
);

const MainDashboard = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
>>>>>>> eb662a97909fbc95ed6f8ad210a068697deff7ad

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
    <div className="main-dashboard-webapp">
      <div className="navigator-bar-container">
        <img src="/MainLogo.png" alt="logo" className="logo" />
        <span>AgriChain</span>

<<<<<<< HEAD
                        <div
                            className={`dropdown-menulist ${isDropdownOpen ? "show" : ""}`}
                            role="menu"
                        >
                            <button
                                role="menuitem"
                                onClick={() => {
                                    setDropdownOpen(false);
                                    navigate("/farmerpage");
                                }}
                            >
                                Farmer
                            </button>

                            <button role="menuitem" onClick={() => { setDropdownOpen(false); navigate("/distributorpage"); }}>
                                Distributor
                            </button>
                            <button role="menuitem" onClick={() => { setDropdownOpen(false); navigate("/retailerpage"); }}>
                                Retailer
                            </button>
                            <button role="menuitem" onClick={() => { setDropdownOpen(false); navigate("/consumerpage"); }}>
                                Consumer
                            </button>
                        </div>
                    </div>
=======
        <div className="navigator-bar-links">
          <button onClick={() => navigate("/maindashboardpage")}>{t("dashboard")}</button>
          <button>{t("Transaction")}</button>
>>>>>>> eb662a97909fbc95ed6f8ad210a068697deff7ad

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
              <button onClick={() => navigate("/farmerpage")}>Farmer</button>
              <button onClick={() => navigate("/distributorpage")}>Distributor</button>
              <button onClick={() => navigate("/retailerpage")}>Retailer</button>
              <button onClick={() => navigate("/consumerpage")}>Consumer</button>
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

          <button>Profile</button>
        </div>
      </div>

      <div className="main-dashboard-content">
        <h2>
          {t("welcome")} <span role="img" aria-label="link">🔗</span>
        </h2>
        <p>{t("title")}</p>
        <div className="dashboard-cards">
          <StatCard title="Products" value="1,428" icon={<span>📦</span>} />
          <StatCard title="Batches" value="76" icon={<span>📊</span>} />
          <StatCard title="Stakeholders" value="112" icon={<span>👥</span>} />
          <StatCard title="Transactions" value="5,890" icon={<span>✅</span>} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
