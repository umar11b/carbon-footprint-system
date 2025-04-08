import React, { useState } from "react";

const CarbonCalculator = () => {
  const [energy, setEnergy] = useState("");
  const [fuel, setFuel] = useState("");
  const [result, setResult] = useState(null);

  const calculateEmissions = () => {
    const emissions = parseFloat(energy) * 0.5 + parseFloat(fuel) * 2.3;
    setResult(emissions.toFixed(2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ecoLight px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-ecoGreen">
        <h2 className="text-3xl font-bold text-ecoGreen mb-6 text-center">
          🌍 Carbon Footprint Calculator
        </h2>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Energy Usage (kWh)"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            className="w-full px-4 py-3 border border-ecoGreen rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen transition"
          />
          <input
            type="number"
            placeholder="Fuel Usage (liters)"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="w-full px-4 py-3 border border-ecoGreen rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen transition"
          />
          <button
            onClick={calculateEmissions}
            className="w-full bg-ecoDark hover:bg-ecoGreen text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="mt-6 text-center bg-ecoLight p-4 rounded-lg border border-ecoGreen">
            <p className="text-lg text-ecoBrown font-medium">
              Estimated Carbon Emissions:
            </p>
            <p className="text-2xl font-bold text-ecoGreen">{result} kg CO₂</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonCalculator;
