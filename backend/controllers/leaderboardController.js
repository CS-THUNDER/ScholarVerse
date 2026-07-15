/*
==========================================
ScholarVerse Backend
Leaderboard Controller
Author: Sudip Pattanayak
==========================================
*/

const User = require("../models/user");

/*=========================================
        GET LEADERBOARD
=========================================*/

const getLeaderboard = async (req, res) => {

    try {

        const users = await User.find({})
            .select("fullName xp level streak")
            .sort({ xp: -1 });

        res.status(200).json({

            success: true,

            count: users.length,

            users

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Server Error"

        });

    }

};

module.exports = {

    getLeaderboard

};