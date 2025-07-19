const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    alertDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
