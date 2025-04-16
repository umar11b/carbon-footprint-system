const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  energyUsage: {
    type: Number,
    required: true,
  },
  fuelUsage: {
    type: Number,
    required: true,
  },
  totalEmissions: {
    type: Number,
    required: true,
  },
  calculationDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Calculation", calculationSchema);
