/*
==========================================
ScholarVerse Backend
File: profileRoutes.js
Description: Profile Routes
==========================================
*/

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {completeOnboarding,getProfile} = require("../controllers/profileController");

router.put("/onboarding", authMiddleware, completeOnboarding);

router.get("/me", authMiddleware, getProfile);



module.exports = router;
