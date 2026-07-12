/*
==========================================
ScholarVerse Backend
Dashboard Controller
Author: Sudip Pattanayak
Description: Dashboard APIs
==========================================
*/

const User = require("../models/user");
const Planner = require("../models/planner");

/*=========================================
        GET DASHBOARD
=========================================*/

const getDashboard = async (req, res) => {
  try {
    // Fetch user and planner data simultaneously
    const [user, tasks] = await Promise.all([
      User.findById(req.user.id).select("-password"),
      Planner.find({ user: req.user.id }).sort({ createdAt: -1 }),
    ]);

    // User not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Dashboard Statistics
    const stats = {
      totalTasks: tasks.length,

      completedTasks: tasks.filter((task) => task.completed).length,

      pendingTasks: 0,

      progress: 0,

      xp: user.xp,

      level: user.level,

      streak: user.streak,
    };

    stats.pendingTasks = stats.totalTasks - stats.completedTasks;

    stats.progress =
      stats.totalTasks === 0
        ? 0
        : Math.round((stats.completedTasks / stats.totalTasks) * 100);

    // Profile Summary
    const profile = {
      goal: user.goal,

      university: user.university,

      course: user.course,

      semester: user.semester,

      experience: user.experience,

      role: user.role,

      avatar: user.avatar,
    };

    // Recent Tasks (Latest 5)
    const recentTasks = tasks.slice(0, 5);

    // Response
    res.status(200).json({
      success: true,

      message: "Dashboard loaded successfully.",

      data: {
        user,

        stats,

        profile,

        recentTasks,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

/*=========================================
        EXPORT
=========================================*/

module.exports = {
  getDashboard,
};
