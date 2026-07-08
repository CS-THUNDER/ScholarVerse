/*
==========================================
ScholarVerse Backend
File: authRoutes.js
Description: Authentication Routes
Author: Sudip Pattanayak
==========================================
*/

const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

// Register Route

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
