/*
==========================================
ScholarVerse Backend
File: authController.js
Description: Authentication Controller
Author: Sudip Pattanayak
==========================================
*/

const User = require("../models/user");
const bcrypt = require("bcrypt");

// ======================================
// Register User
// ======================================

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check Empty Fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    // Check Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Encrypt Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Login User
// ======================================

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check Fields

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "Please fill all fields."

            });

        }

        // Find User

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "User not found."

            });

        }

        // Compare Password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Invalid Password."

            });

        }

        // Generate Token

        const token = jwt.sign(

            {

                id: user._id

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                fullName: user.fullName,

                email: user.email

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {
  registerUser,

  loginUser,
};