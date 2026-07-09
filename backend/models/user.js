/*
==========================================
ScholarVerse Backend
File: User.js
Description: User Schema
Author: Sudip Pattanayak
==========================================
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ===========================
    // Basic Authentication
    // ===========================

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ===========================
    // User Role
    // ===========================

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },

    // ===========================
    // Onboarding
    // ===========================

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    course: {
      type: String,
      default: "",
    },

    semester: {
      type: Number,
      default: 0,
    },

    university: {
      type: String,
      default: "",
    },

    goal: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    // ===========================
    // Gamification
    // ===========================

    xp: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 1,
    },

    streak: {
      type: Number,
      default: 0,
    },

    // ===========================
    // Profile
    // ===========================

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
