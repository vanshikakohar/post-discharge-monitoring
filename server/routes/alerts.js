const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");
const auth = require("../middleware/auth");

// Create alert (can be patient or doctor)
router.post("/", auth, async (req, res) => {
  const { message, alertDate } = req.body;
  if (!message || !alertDate) return res.status(400).json({ msg: "Missing fields" });

  const alert = new Alert({ user: req.user.id, message, alertDate });
  await alert.save();
  res.status(201).json(alert);
});

// Get alerts for current user
router.get("/", auth, async (req, res) => {
  const alerts = await Alert.find({ user: req.user.id }).sort({ alertDate: 1 });
  res.json(alerts);
});

module.exports = router;
