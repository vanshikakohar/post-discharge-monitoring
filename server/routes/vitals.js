const express = require("express");
const router = express.Router();
const Vitals = require("../models/Vitals");
const auth = require("../middleware/auth");
const User = require("../models/User");

// POST vitals (for patient)
router.post("/", auth, async (req, res) => {
  try {
    const { temperature, pulse, bloodPressure, symptoms } = req.body;

    if (!temperature || !pulse || !bloodPressure) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const vital = new Vitals({
      user: req.user.id,
      temperature,
      pulse,
      bloodPressure,
      symptoms,
    });

    await vital.save();
    res.status(201).json(vital);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// GET vitals (for current patient)
router.get("/", auth, async (req, res) => {
  try {
    const vitals = await Vitals.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(vitals);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET all vitals (for doctor)
router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find({ role: "patient" });

    const results = await Promise.all(
      users.map(async (u) => {
        const vitals = await Vitals.find({ user: u._id }).sort({ createdAt: -1 });
        return { user: u, vitals };
      })
    );

    res.json(results);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;