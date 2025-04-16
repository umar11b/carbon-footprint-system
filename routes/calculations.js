const express = require("express");
const router = express.Router();
const Calculation = require("../models/Calculation");

// Get all calculations for a user
router.get("/", async (req, res) => {
  try {
    const calculations = await Calculation.find({ userId: req.user.id }).sort({
      calculationDate: -1,
    });
    res.json(calculations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new calculation
router.post("/", async (req, res) => {
  const { energyUsage, fuelUsage, notes } = req.body;

  // Calculate total emissions (using the same formula as frontend)
  const totalEmissions = energyUsage * 0.5 + fuelUsage * 2.3;

  const calculation = new Calculation({
    userId: req.user.id,
    energyUsage,
    fuelUsage,
    totalEmissions,
    notes,
  });

  try {
    const newCalculation = await calculation.save();
    res.status(201).json(newCalculation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get calculation statistics
router.get("/stats", async (req, res) => {
  try {
    const calculations = await Calculation.find({ userId: req.user.id });

    const stats = {
      totalCalculations: calculations.length,
      averageEmissions:
        calculations.reduce((acc, curr) => acc + curr.totalEmissions, 0) /
        calculations.length,
      totalEnergyUsed: calculations.reduce(
        (acc, curr) => acc + curr.energyUsage,
        0
      ),
      totalFuelUsed: calculations.reduce(
        (acc, curr) => acc + curr.fuelUsage,
        0
      ),
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
