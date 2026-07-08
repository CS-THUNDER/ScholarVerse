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

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);

module.exports = mongoose.model(
  "User",

  userSchema,
);
