const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");





// Load environment variables
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith("http://localhost")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const userRoutes = require("./routes/user");
const vitalsRoutes = require("./routes/vitals");
const authRoutes = require("./routes/auth");
const alertRoutes = require("./routes/alerts");
const medicineReminderRoutes = require('./routes/medicineReminder');


app.use("/api/user", userRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use('/api/medicine', medicineReminderRoutes);


// Default route (optional)
app.get("/", (req, res) => {
  res.send("MediBridge Backend Running");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
