/*
==========================================
ScholarVerse Backend
File: Planner.js
Description: Planner Schema
Author: Sudip Pattanayak
==========================================
*/

const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    title: {
      type: String,

      required: true,

      trim: true,
    },

    description: {
      type: String,

      default: "",
    },

    dueDate: {
      type: Date,

      required: true,
    },

    priority: {
      type: String,

      enum: ["Low", "Medium", "High"],

      default: "Medium",
    },

    completed: {
      type: Boolean,

      default: false,
    },

    xpReward: {
      type: Number,

      default: 10,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Planner", plannerSchema);
