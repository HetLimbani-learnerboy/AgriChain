import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonDashboard.css";


const FarmerDashboard = () => (
  <div className="role-dashboard">
    <div className="dashboard-header">
      <h2>Farmer Dashboard</h2>
      <p>Manage your crops, earnings, and market insights.</p>
    </div>
    <div className="card-container">
      <div className="role-card">
        <img src="/Images/png1_ap.png" alt="Add Produce" />
        <div className="card-body">
          <h3>Add Produce</h3>
          <p>Add new crops with details like crop name, quantity, price, grade, and location.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png2_pl.png" alt="Produce List" />
        <div className="card-body">
          <h3>My Produce List</h3>
          <p>Track the status of your crops from Added → Transported → Sold.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png3_eo.png" alt="Earnings" />
        <div className="card-body">
          <h3>Earnings Overview</h3>
          <p>View your total earnings, recent transactions, and profit summary.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png4_mp.png" alt="Market Prices" />
        <div className="card-body">
          <h3>Market Prices</h3>
          <p>Stay updated with the latest market rates and pricing trends for different crops.</p>
        </div>
      </div>
    </div>
  </div>
);

const DistributorDashboard = () => (
  <div className="role-dashboard">
    <div className="dashboard-header">
      <h2>Distributor Dashboard</h2>
      <p>Manage logistics, transport, and storage efficiently.</p>
    </div>
    <div className="card-container">
      <div className="role-card">
        <img src="/Images/png5_ip.png" alt="Incoming Produce" />
        <div className="card-body">
          <h3>Incoming Produce</h3>
          <p>Check all produce arriving from farmers before transport.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png6_ts.png" alt="Transport Storage" />
        <div className="card-body">
          <h3>Update Transport & Storage</h3>
          <p>Track pickup dates, storage temperatures, and delivery status.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png7_li.png" alt="Logistics Overview" />
        <div className="card-body">
          <h3>Logistics Overview</h3>
          <p>View current shipments, transport routes, and pending deliveries.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png8_mi.png" alt="Market Insights" />
        <div className="card-body">
          <h3>Market Insights</h3>
          <p>Get updates on market demand, pricing trends, and forecasts.</p>
        </div>
      </div>
    </div>
  </div>
);

const RetailerDashboard = () => (
  <div className="role-dashboard">
    <div className="dashboard-header">
      <h2>Retailer Dashboard</h2>
      <p>Manage your stock, pricing, sales, and generate QR codes for consumers.</p>
    </div>
    <div className="card-container">
      <div className="role-card">
        <img src="/Images/png9_rp.png" alt="Received Produce" />
        <div className="card-body">
          <h3>Received Produce</h3>
          <p>View all produce received from distributors and check status.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png10_fs.png" alt="Add Price & Stock" />
        <div className="card-body">
          <h3>Add Final Price & Stock</h3>
          <p>Update stock quantities and set final selling price for each crop.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png11_gq.png" alt="Generate QR Code" />
        <div className="card-body">
          <h3>Generate QR Code</h3>
          <p>Create QR codes for consumers to track products and verify authenticity.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png12_so.png" alt="Sales Overview" />
        <div className="card-body">
          <h3>Sales Overview</h3>
          <p>Check sales performance and basic charts to analyze trends.</p>
        </div>
      </div>
    </div>
  </div>
);

const ConsumerDashboard = () => (
  <div className="role-dashboard">
    <div className="dashboard-header">
      <h2>Consumer Portal</h2>
      <p>Scan QR codes and track the complete supply chain of your produce.</p>
    </div>
    <div className="card-container">
      <div className="role-card">
        <img src="/Images/png13_tv.png" alt="Traceability View" />
        <div className="card-body">
          <h3>Traceability View</h3>
          <p>Track your food from farm to fork: Crop → Farmer → Transport → Retailer.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png14_qv.png" alt="QR Code Info" />
        <div className="card-body">
          <h3>QR Code Verification</h3>
          <p>Scan product QR codes for authentication and detailed supply chain information.</p>
        </div>
      </div>
      <div className="role-card">
        <img src="/Images/png15_st.png" alt="Sustainability Tips" />
        <div className="card-body">
          <h3>Sustainability Tips</h3>
          <p>Learn about eco-friendly practices and how to support sustainable agriculture.</p>
        </div>
      </div>
    </div>
  </div>
);

export default function CommonDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("user"); 
  if (storedUser) {
    const userObj = JSON.parse(storedUser);
    setUser({
      username: userObj.name,
      email: userObj.email,
      role: userObj.role.charAt(0).toUpperCase() + userObj.role.slice(1), 
    });
  } else {
    navigate("/signin");
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setDropdownVisible(false);
    navigate("/signin");
  };

  const renderRoleContent = () => {
    if (!user) return <div className="loading">Loading...</div>;

    switch (user.role) {
      case "Farmer":
        return <FarmerDashboard />;
      case "Distributor":
        return <DistributorDashboard />;
      case "Retailer":
        return <RetailerDashboard />;
      case "Consumer":
        return <ConsumerDashboard />;
      default:
        return <div className="dashboard-header"><h2>Welcome</h2><p>No role assigned.</p></div>;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/MainLogo.png" alt="logo" className="navbar-logo" />
          <span className="navbar-title">AgriChain</span>
        </div>
        <div className="navbar-right">
          <button className="nav-btn">Transactions</button>
          <div className="profile-container" ref={dropdownRef}>
            <button
              className="profile-btn"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
             <span className="profile-icon">Profile</span>
            </button>
            {dropdownVisible && user && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <strong>{user.username}</strong>
                  <span>{user.email}</span>
                  <span className="role-badge">{user.role}</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        {renderRoleContent()}
        <section className="government-section">
          <div className="gov-header">
            <img src="/Images/gov-icon.png" alt="Government Icon" />
            <h2>Government Collaboration</h2>
          </div>
          <p>
            AgriChain allows government agencies to integrate directly with the supply chain ecosystem. This ensures proper monitoring of agricultural resources, subsidies, and quality standards.
          </p>
          <p>
            By connecting with AgriChain, government departments can reduce bureaucracy, increase accountability, and support sustainable agricultural practices nationwide.
          </p>
          <ul>
            <li>
              <strong>Real-time Data:</strong> Access live data on crop production, storage levels, and logistics for better planning and disaster relief management.
            </li>
            <li>
              <strong>Subsidy Tracking:</strong> Ensure subsidies reach the intended farmers by verifying transactions on the blockchain, preventing fraud.
            </li>
            <li>
              <strong>Food Safety:</strong> Quickly trace the source of contaminated produce during food safety audits, protecting public health.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}