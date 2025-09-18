import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import MainDashboard from "./Components/MainDashboard";
import Farmerpage from "./Components/Farmerpage";
import DistributorPage from "./Components/DistributorPage";
import RetailerPage from "./Components/RetailerPage";
import ConsumerPage from "./Components/ConsumerPage";
import SignInPage from "./Components/SignInPage"
import SignUpPage from "./Components/SignUpPage"
import ForgetPasswordpage from "./Components/ForgetPasswordpage"

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/maindashboardpage" element={<MainDashboard />} />
        <Route path="/farmerpage" element={<Farmerpage />} />
        <Route path="/distributorpage" element={<DistributorPage />} />
        <Route path="/retailerpage" element={<RetailerPage />} />
        <Route path="/consumerpage" element={<ConsumerPage />} />
        <Route path="/signinpage" element={< SignInPage />} />
        <Route path="/signuppage" element={< SignUpPage />} />
        <Route path="/forgetpasswordpage" element={< ForgetPasswordpage />} />
      </Routes>
  );
};

export default App;
