/*
==========================================
ScholarVerse Backend
File: profileController.js
Description: User Profile Controller
==========================================
*/

const User = require("../models/user");

// ======================================
// Complete Onboarding
// ======================================

const completeOnboarding = async (req, res) => {
  try {
    const { course, semester, university, goal, experience } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.course = course;
    user.semester = semester;
    user.university = university;
    user.goal = goal;
    user.experience = experience;

    user.profileCompleted = true;

    await user.save();

    const userResponse = user.toObject();

    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Onboarding completed successfully.",
      user: userResponse,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*=========================================
        GET PROFILE
=========================================*/

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        res.status(200).json({

            success: true,

            user

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

module.exports = {
  completeOnboarding,

  getProfile,
};