import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerPagestyle.css";

const FarmerPage = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [produce, setProduce] = useState([]);
  const [form, setForm] = useState({
    cropName: "",
    quantity: "",
    price: "",
    grade: "",
    location: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduce = (e) => {
    e.preventDefault();
    if (!form.cropName || !form.quantity || !form.price) return;

    const newProduce = {
      ...form,
      id: Date.now(),
      status: "Added",
    };

    setProduce([...produce, newProduce]);
    setForm({ cropName: "", quantity: "", price: "", grade: "", location: "" });
  };

  const updateStatus = (id) => {
    setProduce((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.status === "Added") return { ...item, status: "Transported" };
          if (item.status === "Transported") return { ...item, status: "Sold" };
        }
        return item;
      })
    );
  };

  return (
    <div className="farmer-dashboard-container">
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
                            <button role="menuitem" onClick={() => setDropdownOpen(false)}>
                                Distributor
                            </button>
                            <button role="menuitem" onClick={() => setDropdownOpen(false)}>
                                Retailer
                            </button>
                            <button role="menuitem" onClick={() => setDropdownOpen(false)}>
                                Consumer
                            </button>
                        </div>
                    </div>

                    <button>Profile</button>
                </div>
            </div>

      {/* Farmer Dashboard */}
      <div className="farmer-main">
        <h2 className="farmer-heading">Farmer Dashboard</h2>
        <p className="farmer-subtext">
          Manage your crops, track status, and add produce for sale.
        </p>

        {/* Add Produce Form */}
        <div className="farmer-card farmer-form-card">
          <h3>Add Produce</h3>
          <form onSubmit={handleAddProduce} className="farmer-form">
            <input
              type="text"
              name="cropName"
              placeholder="Crop Name"
              value={form.cropName}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (kg)"
              value={form.quantity}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="grade"
              placeholder="Quality Grade"
              value={form.grade}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
            <button type="submit" className="farmer-btn-add">
              ➕ Add Produce
            </button>
          </form>
        </div>

        {/* My Produce List */}
        <div className="farmer-card farmer-produce-card">
          <h3>My Produce List</h3>
          <div className="farmer-produce-list">
            {produce.length === 0 ? (
              <p>No produce added yet.</p>
            ) : (
              produce.map((item) => (
                <div key={item.id} className="farmer-produce-item fade-in">
                  <h4>{item.cropName}</h4>
                  <p>
                    <strong>Qty:</strong> {item.quantity} kg
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{item.price}
                  </p>
                  <p>
                    <strong>Grade:</strong> {item.grade || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong> {item.location || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`farmer-status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </p>
                  {item.status !== "Sold" && (
                    <button
                      className="farmer-btn-status"
                      onClick={() => updateStatus(item.id)}
                    >
                      Update Status
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerPage;
