/*
==========================================
ScholarVerse Backend
Leaderboard Controller
Author: Sudip Pattanayak
==========================================
*/

const User = require("../models/user");

exports.getLeaderboard = async (req, res) => {
  try {

    const users = await User.find()
      .sort({
        xp: -1,
        level: -1,
        streak: -1,
      })
      .select("fullName course xp level streak avatar")
      .lean();

    const currentUserId = req.user.id;

    const currentRank =
      users.findIndex((user) => user._id.toString() === currentUserId) + 1;

    if (currentRank === 0) {
      return res.status(404).json({
        success: false,

        message: "User not found in leaderboard.",
      });
    }

    const participants = users.length;

    const top100 = users.slice(0, 100);

    const xpNeeded =
      currentRank <= 100
        ? 0
        : Math.max(
            0,
            (top100[top100.length - 1]?.xp || 0) - users[currentRank - 1].xp,
          );

    const progress =
      currentRank <= 100
        ? 100
        : Math.max(
            0,
            Math.min(
              100,
              (users[currentRank - 1].xp /
                (top100[top100.length - 1]?.xp || 1)) *
                100,
            ),
          );
    const currentUser = users[currentRank - 1];

    res.json({
      success: true,

      season: "Weekly",

      participants,

      currentUserRank: currentRank,

      xpNeeded,

      progress,

      currentUser,

      users: top100,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};