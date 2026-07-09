/*
==========================================
ScholarVerse Backend
File: plannerRoutes.js
Description: Planner Routes
Author: Sudip Pattanayak
==========================================
*/

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask
} = require("../controllers/plannerController");

router.post("/create", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/complete/:id", authMiddleware, completeTask);
module.exports = router;
