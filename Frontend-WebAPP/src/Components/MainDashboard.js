import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainDashboardstyle.css";

const StatCard = ({ title, value, icon }) => (
    <div className="stat-card">
        <div className="icon">{icon}</div>
        <div>
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    </div>
);

const TransactionRow = ({ hash, from, to, product, status }) => (
    <tr className="row">
        <td className="cell hidden md:block font-mono">{hash}</td>
        <td className="cell">{from}</td>
        <td className="cell">{to}</td>
        <td className="cell hidden sm:block">{product}</td>
        <td className="cell">
            <span className={`status ${status.toLowerCase()}`}>{status}</span>
        </td>
    </tr>
);

const MainDashboard = () => {
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
        <div className="main-dashboard-webapp">
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

            <div className="main-dashboard-content">
                <h2>Welcome to AgriChain <icon>🔗</icon></h2>
                <p>Track the supply chain from farm to fork with transparency.</p>
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
