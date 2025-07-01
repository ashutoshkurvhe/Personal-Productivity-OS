const PomodoroSession = require("../models/PomodoroSession");

exports.savePomodoroSession = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { duration, completedAt } = req.body;

    if (!duration) {
      return res.status(400).json({ message: "Duration is required" });
    }

    const session = await PomodoroSession.create({
      userId,
      duration,
      completedAt: completedAt || new Date(), 
    });

    console.log(`User ${userId} completed a pomodoro:`, session);

    res.json({ message: "Pomodoro session saved", session });
  } catch (error) {
    console.error("Save Pomodoro Error:", error.message);
    res
      .status(500)
      .json({ message: "Server error while saving pomodoro session" });
  }
};

exports.getPomodoroStats = async (req, res) => {
  try {
    // In the future: query PomodoroSession collection for real stats

    res.json({
      completedToday: 3,
      totalTime: 75, // minutes
    });
  } catch (error) {
    console.error("Get Pomodoro Stats Error:", error.message);
    res
      .status(500)
      .json({ message: "Server error while retrieving pomodoro stats" });
  }
};
