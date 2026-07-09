/*
==========================================
ScholarVerse Backend
File: server.js
Description: Main Express Server
Author: Sudip Pattanayak
==========================================
*/

// =========================================
// Import Packages
// =========================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Database
const connectDB = require("./config/database");

// Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const plannerRoutes = require("./routes/plannerRoutes");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

// =========================================
// Configurations
// =========================================

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// =========================================
// Middleware
// =========================================

app.use(cors());
app.use(express.json());

// =========================================
// Routes
// =========================================

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/planner", plannerRoutes);

// Test Protected Route

app.get("/api/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected Route Accessed",
    user: req.user,
  });
});

// Test Route

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 ScholarVerse Backend Running Successfully",
  });
});

// =========================================
// Start Server
// =========================================

const startServer = async () => {
  try {
    // Connect MongoDB first
    await connectDB();

    // Start Express Server
    app.listen(PORT, () => {
      console.log(`🚀 ScholarVerse Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
  }
};

startServer();