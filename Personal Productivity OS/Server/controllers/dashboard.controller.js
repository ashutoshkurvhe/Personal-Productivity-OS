const Event = require("../models/Event");
const Note = require("../models/Note");
const Task = require("../models/Task");
const Project = require("../models/Project");
const Pomodoro = require("../models/PomodoroSession");
const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if userId is a valid ObjectId
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userObjectId = new Types.ObjectId(userId);

    // Total Tasks
    const totalTasks = await Task.countDocuments({ userId: userObjectId });

    // Recent Tasks (latest 5)
    const recentTasks = await Task.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(3);

    // Total Notes
    const totalNotes = await Note.countDocuments({ userId: userObjectId });

    // Recent Notes (latest 5)
    const recentNotes = await Note.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(3);

    // Total Projects
    const totalProjects = await Project.countDocuments({
      userId: userObjectId,
    });

    // Upcoming Events (latest 5)
    const upcomingEvents = await Event.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(3);

    // Return final dashboard response
    return res.json({
      totalTasks,
      totalNotes,
      totalProjects,
      recentTasks,
      recentNotes,
      upcomingEvents,
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
