import React from "react";

const EmissionsReport = () => {
  const emissions = {
    monthly: 1250,
    yearly: 15000,
    breakdown: {
      electricity: 40,
      transportation: 45,
      waste: 15,
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ecoLight px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg border border-ecoGreen">
        <h2 className="text-3xl font-bold text-center text-ecoGreen mb-4">
          📊 Emissions Report
        </h2>

        <div className="text-center text-ecoBrown mb-6">
          <p className="text-lg">
            <strong>Monthly Emissions:</strong>{" "}
            <span className="text-ecoDark">{emissions.monthly} kg CO₂</span>
          </p>
          <p className="text-lg">
            <strong>Yearly Emissions:</strong>{" "}
            <span className="text-ecoDark">{emissions.yearly} kg CO₂</span>
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-ecoDark mb-2">
            Breakdown by Category
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>⚡ Electricity</span>
              <span className="font-semibold text-ecoGreen">
                {emissions.breakdown.electricity}%
              </span>
            </li>
            <li className="flex justify-between">
              <span>🚗 Transportation</span>
              <span className="font-semibold text-ecoGreen">
                {emissions.breakdown.transportation}%
              </span>
            </li>
            <li className="flex justify-between">
              <span>🗑️ Waste</span>
              <span className="font-semibold text-ecoGreen">
                {emissions.breakdown.waste}%
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmissionsReport;
