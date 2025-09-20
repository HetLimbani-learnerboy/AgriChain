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
        <Route path="/maindashboard" element={<MainDashboard />} />
        <Route path="/farmer" element={<Farmerpage />} />
        <Route path="/distributor" element={<DistributorPage />} />
        <Route path="/retailer" element={<RetailerPage />} />
        <Route path="/consumer" element={<ConsumerPage />} />
        <Route path="/signin" element={< SignInPage />} />
        <Route path="/signup" element={< SignUpPage />} />
        <Route path="/forgetpassword" element={< ForgetPasswordpage />} />
      </Routes>
  );
};

export default App;
