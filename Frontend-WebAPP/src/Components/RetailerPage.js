import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RetailerPagestyle.css";

const RetailerPage = () => {
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
    <div className="retailer-dashboard-webapp">
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

      <div className="retailer-dashboard-content">
        <h2>Retailer Dashboard</h2>
        <p>Manage your stock, pricing, sales, and generate QR codes for consumers.</p>

        <div className="retailer-sections">
          <div className="retailer-card">
            <img
              src="/Images/png9_rp.png"
              alt="Received Produce"
            />
            <div className="retailer-card-body">
              <h3>Received Produce</h3>
              <p>View all produce received from distributors and check status.</p>
            </div>
          </div>

          <div className="retailer-card">
            <img
              src="/Images/png10_fs.png"
              alt="Add Price & Stock"
            />
            <div className="retailer-card-body">
              <h3>Add Final Price & Stock</h3>
              <p>Update stock quantities and set final selling price for each crop.</p>
            </div>
          </div>

          <div className="retailer-card">
            <img
              src="/Images/png11_gq.png"
              alt="Generate QR Code"
            />
            <div className="retailer-card-body">
              <h3>Generate QR Code</h3>
              <p>Create QR codes for consumers to track products and verify authenticity.</p>
            </div>
          </div>

          <div className="retailer-card">
            <img
              src="/Images/png12_so.png"
              alt="Sales Overview"
            />
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
