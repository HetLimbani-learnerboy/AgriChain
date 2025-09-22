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
  const workflowRef = useRef(null);

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

  const scrollToWorkflow = () => {
    workflowRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const imageFiles = [
    "png1_ap.png","png2_pl.png","png3_eo.png","png4_mp.png","png5_ip.png",
    "png6_ts.png","png7_li.png","png8_mi.png","png9_rp.png","png10_fs.png",
    "png11_gq.png","png12_so.png","png13_tv.png","png14_qv.png","png15_st.png"
  ];

  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="navbar-left">
          <img src="/MainLogo.png" alt="logo" className="navbar-logo" />
          <span className="navbar-title">AgriChain</span>
        </div>
        <div className="navbar-right">
          <div className="role-dropdown" ref={roleRef}>
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

      {/* Header */}
      <header className="landing-header">
        <h1>{t("welcome")} 🌾</h1>
        <p>{t("title")}</p>

        {/* Image Marquee */}
        <div className="image-marquee">
          <div className="marquee-track">
            {imageFiles.concat(imageFiles).map((file, i) => (
              <img key={i} src={`/Images/${file}`} alt={`slide-${i}`} />
            ))}
          </div>
        </div>
      </header>

      {/* Government Section */}
      <section className="landing-government">
        <h2>{t("government")}</h2>
        <p>{t("govText1")}</p>
        <p>{t("govText2")}</p>
        <button className="gov-learnmore-btn" onClick={scrollToWorkflow}>{t("learnMore")}</button>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section" ref={workflowRef}>
        <h2 className="workflow-title">{t("workflowTitle")}</h2>
        <div className="workflow-steps">
          {t("steps", { returnObjects: true }).map((step, idx) => (
            <div className="workflow-card" key={idx}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GetStartedPage;
