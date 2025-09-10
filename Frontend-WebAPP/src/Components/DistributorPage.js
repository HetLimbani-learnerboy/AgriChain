import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DistributorPagestyle.css";

const DistributorPage = () => {
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
        <div className="distributor-dashboard-webapp">
            {/* Navbar */}
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

            <div className="distributor-dashboard-content">
                <h2>Distributor Dashboard</h2>
                <p>Manage logistics, transport, and storage efficiently.</p>

                <div className="distributor-sections">
                    {/* Section 1 */}
                    <div className="distributor-card">
                        <img src="https://source.unsplash.com/400x250/?farm,produce" alt="Incoming Produce" />
                        <div className="distributor-card-body">
                            <h3>Incoming Produce</h3>
                            <p>Check all produce arriving from farmers before transport.</p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="distributor-card">
                        <img src="https://source.unsplash.com/400x250/?warehouse,storage" alt="Transport Storage" />
                        <div className="distributor-card-body">
                            <h3>Update Transport & Storage</h3>
                            <p>Track pickup dates, storage temperatures, and delivery status.</p>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="distributor-card">
                        <img src="https://source.unsplash.com/400x250/?logistics,truck" alt="Logistics Overview" />
                        <div className="distributor-card-body">
                            <h3>Logistics Overview</h3>
                            <p>View current shipments, transport routes, and pending deliveries.</p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="distributor-card">
                        <img src="https://source.unsplash.com/400x250/?market,agriculture" alt="Market Insights" />
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
