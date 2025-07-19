const mongoose = require('mongoose');

const medicineReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  dose: String,
  time: String, // e.g., "08:00"
  date: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('MedicineReminder', medicineReminderSchema);
