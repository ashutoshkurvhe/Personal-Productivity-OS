require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const noteRoutes = require("./routes/note.routes");
const projectRoutes = require("./routes/project.routes");
const eventRoutes = require("./routes/event.routes");
const notificationRoutes = require("./routes/notification.routes");
const pomodoroRoutes = require("./routes/pomodoro.routes")
const app = express();

app.use(express.json());

connectDB();

app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/task", taskRoutes);
app.use("/api/v2/note", noteRoutes);
app.use("/api/v2/project", projectRoutes);
app.use("/api/v2/event", eventRoutes);
app.use("/api/v2/notify", notificationRoutes);
app.use("/api/pomodoro", pomodoroRoutes);
// app.use("/api/v2/pomodoro", pomodoroRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));