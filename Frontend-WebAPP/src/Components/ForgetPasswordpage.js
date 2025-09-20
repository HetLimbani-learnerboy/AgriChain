import React from "react";
import { useNavigate } from "react-router-dom";
// import "./ForgetPasswordpage.css";

const ForgetPassword = () => {
    const navigate = useNavigate();
    return (
        <div className="forget-password-page">
            <div className="forgetpage-container">
                <span>Forget Password Page</span>
                <input type="email" placeholder="Enter your email" required />
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    );
}
export default ForgetPassword;