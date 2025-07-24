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
    const userId = req.user.id;

    // Get all sessions for the user
    const sessions = await PomodoroSession.find({ userId });

    // Total sessions
    const sessionsCompleted = sessions.length;

    // Total time (in minutes)
    const totalTime = sessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );

    // Get today's date boundaries
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Filter sessions for today
    const sessionsToday = sessions.filter(
      (s) => s.completedAt >= todayStart && s.completedAt <= todayEnd
    ).length;

    res.json({
      sessions,
      sessionsCompleted,
      totalTime, // in minutes
      sessionsToday,
      todayStart,
      todayEnd,
    });
    
  } catch (error) {
    console.error("Get Pomodoro Stats Error:", error.message);
    res
      .status(500)
      .json({ message: "Server error while retrieving pomodoro stats" });
  }
};
