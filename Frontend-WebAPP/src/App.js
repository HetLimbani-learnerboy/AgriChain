import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDashboard from "./Components/MainDashboard";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainDashboard />} />
      </Routes>
  );
};

export default App;
