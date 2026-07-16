/*
==========================================
ScholarVerse Migration
001 - Add Seasonal XP
Author: Sudip Pattanayak
==========================================
*/

const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/user");

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB");

    const users = await User.find();

    let updated = 0;

    for (const user of users) {
      let changed = false;

      if (user.weeklyXP === undefined) {
        user.weeklyXP = user.xp || 0;
        changed = true;
      }

      if (user.monthlyXP === undefined) {
        user.monthlyXP = user.xp || 0;
        changed = true;
      }

      if (user.yearlyXP === undefined) {
        user.yearlyXP = user.xp || 0;
        changed = true;
      }

      if (changed) {
        await user.save();
        updated++;
      }
    }

    console.log(`✅ Updated ${updated} users`);

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

migrate();
