const savePomodoroSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const { duration, completedAt } = req.body; // e.g., duration in minutes, completed timestamp

    if (!duration) {
      return res.status(400).json({ message: "Duration is required" });
    }

    // In the future: await PomodoroSession.create({ userId, duration, completedAt });

    console.log(`User ${userId} completed a pomodoro:`, req.body);

    res.json({ message: "Pomodoro session saved" });
  } catch (error) {
    console.error("Save Pomodoro Error:", error.message);
    res
      .status(500)
      .json({ message: "Server error while saving pomodoro session" });
  }
};

const getPomodoroStats = async (req, res) => {
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

module.exports = { savePomodoroSession, getPomodoroStats };
