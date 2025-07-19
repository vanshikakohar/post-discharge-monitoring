const mongoose = require("mongoose");

const vitalsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    temperature: Number,
    pulse: Number,
    bloodPressure: String,
    oxygen: Number,
    symptoms: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vitals", vitalsSchema);