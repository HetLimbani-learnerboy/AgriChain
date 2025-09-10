import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDashboard from "./Components/MainDashboard";
import Farmerpage from "./Components/Farmerpage";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/farmerpage" element={<Farmerpage />} />
      </Routes>
  );
};

export default App;
