const express = require('express');
const router = express.Router();
const MedicineReminder = require('../models/MedicineReminder');

// Add new reminder
router.post('/', async (req, res) => {
  try {
    const reminder = new MedicineReminder(req.body);
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get today's reminders for a user
router.get('/today/:userId', async (req, res) => {
  const { userId } = req.params;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    const reminders = await MedicineReminder.find({
      userId,
      date: { $gte: start, $lte: end },
    });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
