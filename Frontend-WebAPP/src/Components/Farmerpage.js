import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerPagestyle.css";

const FarmerPage = () => {
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
    <div className="farmer-dashboard-webapp">
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

          <button>Profile</button>
        </div>
      </div>

      <div className="farmer-dashboard-content">
        <h2>Farmer Dashboard</h2>
        <p>Manage your crops, earnings, and market insights.</p>

        <div className="farmer-sections">
          <div className="farmer-card">
            <img
              src="/Images/png1_ap.png"
              alt="Add Produce"
            />
            <div className="farmer-card-body">
              <h3>Add Produce</h3>
              <p>
                Add new crops with details like crop name, quantity, price,
                grade, and location.
              </p>
            </div>
          </div>

          <div className="farmer-card">
            <img
              src="/Images/png2_pl.png"
              alt="Produce List"
            />
            <div className="farmer-card-body">
              <h3>My Produce List</h3>
              <p>
                Track the status of your crops from Added → Transported → Sold.
              </p>
            </div>
          </div>

          <div className="farmer-card">
            <img
              src="/Images/png3_eo.png"
              alt="Earnings"
            />
            <div className="farmer-card-body">
              <h3>Earnings Overview</h3>
              <p>
                View your total earnings, recent transactions, and profit
                summary.
              </p>
            </div>
          </div>

          <div className="farmer-card">
            <img
              src="/Images/png4_mp.png"
              alt="Market Prices"
            />
            <div className="farmer-card-body">
              <h3>Market Prices</h3>
              <p>
                Stay updated with the latest market rates and pricing trends for
                different crops.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerPage;
