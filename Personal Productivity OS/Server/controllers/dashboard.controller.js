const Event = require("../models/Event");
const Note = require("../models/Note");
const Task = require("../models/Task");
const Project = require("../models/Project");
const Pomodoro = require("../models/PomodoroSession");
const { isValidObjectId, Types } = require("mongoose");


//Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));


        //Fatch all Tasks
        const tasks = await Task.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, tasks: { $sum: "$tasks" } } },
        ]);

        console.log("tasks", { tasks, userId: 
            isValidObjectId(userId)
        });
        
        //Fetch all Notes
        const notes = await Note.aggregate([
            { $match: { userId: userObjectId } },
            { $group: {_id: null, notes: { $sum: "$notes"}}}
        ])

        console.log("notes", {
            notes, userId:
                isValidObjectId(userId)
        });

        //Fetch all Projects
        const projects = await Project.aggregate([
            { $match: { userId: userObjectId } },
            { $group: {_id: null, projects: { $sum: "$projets"}}}
        ])

        console.log("projects", {
            projects, userId:
                isValidObjectId(userId)
        });

        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
} 