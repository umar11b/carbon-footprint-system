import React from "react";

const EmissionsReport = ({ emissionsData = {} }) => {
  // Calculate monthly and yearly projections based on current calculation
  const monthlyEmissions = (emissionsData.totalEmissions || 0) * 30; // Approximate monthly
  const yearlyEmissions = monthlyEmissions * 12;

  // Calculate breakdown percentages
  const energyContribution = emissionsData.totalEmissions
    ? ((emissionsData.energy * 0.5) / emissionsData.totalEmissions) * 100
    : 0;
  const fuelContribution = emissionsData.totalEmissions
    ? ((emissionsData.fuel * 2.3) / emissionsData.totalEmissions) * 100
    : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-ecoLight px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg border border-ecoGreen">
        <h2 className="text-3xl font-bold text-center text-ecoGreen mb-4">
          📊 Emissions Report
        </h2>

        {emissionsData.calculationDate ? (
          <>
            <div className="text-center text-ecoBrown mb-6">
              <p className="text-sm mb-2">
                Calculation Date:{" "}
                {new Date(emissionsData.calculationDate).toLocaleDateString()}
              </p>
              <p className="text-lg">
                <strong>Latest Calculation:</strong>{" "}
                <span className="text-ecoDark">
                  {emissionsData.totalEmissions.toFixed(2)} kg CO₂
                </span>
              </p>
              <p className="text-lg">
                <strong>Monthly Projection:</strong>{" "}
                <span className="text-ecoDark">
                  {monthlyEmissions.toFixed(2)} kg CO₂
                </span>
              </p>
              <p className="text-lg">
                <strong>Yearly Projection:</strong>{" "}
                <span className="text-ecoDark">
                  {yearlyEmissions.toFixed(2)} kg CO₂
                </span>
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-ecoDark mb-2">
                Breakdown by Category
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>⚡ Energy Usage ({emissionsData.energy} kWh)</span>
                  <span className="font-semibold text-ecoGreen">
                    {energyContribution.toFixed(1)}%
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>🚗 Fuel Usage ({emissionsData.fuel} liters)</span>
                  <span className="font-semibold text-ecoGreen">
                    {fuelContribution.toFixed(1)}%
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center text-ecoBrown p-8">
            <p>No calculation data available.</p>
            <p>Please use the Carbon Calculator to generate a report.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmissionsReport;
