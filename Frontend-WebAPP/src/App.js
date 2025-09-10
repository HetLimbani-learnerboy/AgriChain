import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDashboard from "./Components/MainDashboard";
import Farmerpage from "./Components/Farmerpage";
import DistributorPage from "./Components/DistributorPage";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/farmerpage" element={<Farmerpage />} />
        <Route path="/distributorpage" element={<DistributorPage />} />
      </Routes>
  );
};

export default App;
