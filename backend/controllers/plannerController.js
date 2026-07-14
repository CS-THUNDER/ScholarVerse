/*
==========================================
ScholarVerse Backend
Planner Controller
==========================================
*/

const Planner = require("../models/planner");
const User = require("../models/user");

/*=========================================
        CREATE TASK
=========================================*/

const createTask = async (req, res) => {
  try {
    const {
      title,

      description,

      dueDate,

      priority,
    } = req.body;

    /*=========================================
        VALIDATION
=========================================*/

    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        success: false,

        message: "Task title must be at least 3 characters.",
      });
    }

    if (title.length > 100) {
      return res.status(400).json({
        success: false,

        message: "Task title cannot exceed 100 characters.",
      });
    }

    if (description && description.length > 300) {
      return res.status(400).json({
        success: false,

        message: "Description cannot exceed 300 characters.",
      });
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(dueDate);

    if (selectedDate < today) {
      return res.status(400).json({
        success: false,

        message: "Due date cannot be in the past.",
      });
    }

    const allowedPriorities = ["Low", "Medium", "High"];

    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,

        message: "Invalid priority.",
      });
    }

    const task = await Planner.create({
      user: req.user.id,

      title,

      description,

      dueDate,

      priority,
    });

    res.status(201).json({
      success: true,

      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};


/*=========================================
GET ALL TASKS
=========================================*/

const getTasks = async (req, res) => {

    try {

        const tasks = await Planner.find({

            user: req.user.id

        }).sort({

            dueDate: 1

        });

        res.status(200).json({

            success: true,

            count: tasks.length,

            tasks

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

/*=========================================
        UPDATE TASK
=========================================*/

const updateTask = async (req, res) => {

    try {

        const task = await Planner.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        task.title = req.body.title || task.title;

        task.description = req.body.description || task.description;

        task.dueDate = req.body.dueDate || task.dueDate;

        task.priority = req.body.priority || task.priority;

        await task.save();

        res.status(200).json({

            success: true,

            task

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

/*=========================================
        DELETE TASK
=========================================*/

const deleteTask = async (req, res) => {

    try {

        const task = await Planner.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        await task.deleteOne();

        res.status(200).json({

            success: true,

            message: "Task deleted successfully"

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

/*=========================================
        COMPLETE TASK
=========================================*/

const completeTask = async (req, res) => {

    try {

        const task = await Planner.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        if (!task.completed) {

            task.completed = true;

            await task.save();

            const user = await User.findById(req.user.id);

            user.xp += task.xpReward;

            user.level = Math.floor(user.xp / 100) + 1;

            await user.save();

        }

        res.status(200).json({

            success: true,

            task

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
  createTask,
  getTasks,
  updateTask,
  deleteTask,
completeTask,
};
