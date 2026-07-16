/*
==========================================
ScholarVerse
Season Stats
Author: Sudip Pattanayak
==========================================
*/

const mongoose = require("mongoose");

const seasonStatsSchema = new mongoose.Schema(
{

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    season:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Season",
        required:true
    },

    xp:{
        type:Number,
        default:0
    },

    completedTasks:{
        type:Number,
        default:0
    },

    studyHours:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
}
);

seasonStatsSchema.index(
{
    user:1,
    season:1
},
{
    unique:true
}
);

module.exports =
mongoose.models.SeasonStats ||
mongoose.model("SeasonStats",seasonStatsSchema);