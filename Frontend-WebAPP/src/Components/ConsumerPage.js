import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ConsumerPagestyle.css";

const ConsumerPage = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="consumer-dashboard-webapp">
<<<<<<< HEAD
      {/* Navbar */}
=======
>>>>>>> eb662a97909fbc95ed6f8ad210a068697deff7ad
      <div className="navigator-bar-container">
        <img src="/MainLogo.png" alt="logo" className="logo" />
        <span>AgriChain</span>

        <div className="navigator-bar-links">
          <button onClick={() => navigate("/")}>Dashboard</button>
          <button>Transactions</button>

          <div className="role-dropdown" ref={dropdownRef}>
            <button
              className="role-button"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Role ▾
            </button>

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

<<<<<<< HEAD
              <button role="menuitem" onClick={() => { setDropdownOpen(false); navigate("/distributorpage");}}>
=======
              <button role="menuitem" onClick={() => { setDropdownOpen(false); navigate("/distributorpage"); }}>
>>>>>>> eb662a97909fbc95ed6f8ad210a068697deff7ad
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

          <button>Profile</button>
        </div>
      </div>

      <div className="consumer-dashboard-content">
        <h2>Consumer Portal</h2>
        <p>Scan QR codes and track the complete supply chain of your produce.</p>

        <div className="consumer-sections">
          <div className="consumer-card">
            <img
              src="/Images/png13_tv.png"
              alt="Traceability View"
            />
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
            <img
              src="/Images/png14_qv.png"
              alt="QR Code Info"
            />
            <div className="consumer-card-body">
              <h3>QR Code Verification</h3>
              <p>
                Scan or view QR codes for product authentication and detailed info.
              </p>
            </div>
          </div>

          <div className="consumer-card">
            <img
              src="/Images/png15_st.png"
              alt="Sustainability Tips"
            />
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
