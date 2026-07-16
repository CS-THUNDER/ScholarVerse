/*
==========================================
ScholarVerse
Season Model
Author: Sudip Pattanayak
==========================================
*/

const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema(
{
    type:{
        type:String,
        enum:["weekly","monthly","yearly"],
        required:true
    },

    seasonNumber:{
        type:Number,
        required:true
    },

    seasonCode: {
    type: String,
    unique: true
   },

    startDate:{
        type:Date,
        required:true
    },

    endDate:{
        type:Date,
        required:true
    },

    active:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.models.Season ||
mongoose.model("Season",seasonSchema);