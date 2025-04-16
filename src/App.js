import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CarbonCalculator from "./components/CarbonCalculator";
import EmissionsReport from "./components/EmissionsReport";
import Chatbot from "./components/Chatbot";
import LogGoals from "./components/LogGoals";

function App() {
  const [emissionsData, setEmissionsData] = useState({
    energy: 0,
    fuel: 0,
    totalEmissions: 0,
    calculationDate: null,
  });

  return (
    <Router>
      <div className="min-h-screen bg-ecoLight">
        {/* 🌿 Modern Eco-Themed Navbar */}
        <nav className="bg-white shadow-md py-4 px-6 mb-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-ecoGreen">
              🌍 Cloud Based Eco-Tracker
            </h1>
            <div className="space-x-4">
              <Link
                to="/"
                className="text-ecoDark hover:text-ecoGreen font-medium transition duration-200"
              >
                Carbon Calculator
              </Link>
              <Link
                to="/report"
                className="text-ecoDark hover:text-ecoGreen font-medium transition duration-200"
              >
                Emissions Report
              </Link>
              <Link
                to="/chatbot"
                className="text-ecoDark hover:text-ecoGreen font-medium transition duration-200"
              >
                Chatbot
              </Link>
              <Link
                to="/goals"
                className="text-ecoDark hover:text-ecoGreen font-medium transition duration-200"
              >
                Log Goals
              </Link>
            </div>
          </div>
        </nav>

        {/* 💻 Page Routes */}
        <Routes>
          <Route
            path="/"
            element={<CarbonCalculator onCalculate={setEmissionsData} />}
          />
          <Route
            path="/report"
            element={<EmissionsReport emissionsData={emissionsData} />}
          />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/goals" element={<LogGoals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
