exports.savePomodoroSession = async (req, res) => {
  // You might save session logs in a separate collection
  console.log(`User ${req.user._id} completed a pomodoro:`, req.body);
  res.json({ message: "Pomodoro session saved" });
};

exports.getPomodoroStats = async (req, res) => {
  // Return placeholder stats for now
  res.json({ completedToday: 3, totalTime: 75 });
};