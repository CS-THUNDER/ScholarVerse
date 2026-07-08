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
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

// =========================================
// Configurations
// =========================================

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// =========================================
// Middleware
// =========================================

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,

    message: "Protected Route Accessed",

    user: req.user,
  });
});

// =========================================
// Test Route
// =========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    message: "🚀 ScholarVerse Backend Running Successfully",
  });
});

// =========================================
// Start Server
// =========================================

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
