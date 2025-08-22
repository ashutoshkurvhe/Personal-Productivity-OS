require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors")
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const noteRoutes = require("./routes/note.routes");
const projectRoutes = require("./routes/project.routes");
const eventRoutes = require("./routes/event.routes");
const notificationRoutes = require("./routes/notification.routes");
const pomodoroRoutes = require("./routes/pomodoro.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const webpush = require("web-push");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

connectDB();

// Set VAPID keys once globally here
webpush.setVapidDetails(
  "mailto:ashu0101ashu2001@gmail.com", // use your real email
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/note", noteRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/notify", notificationRoutes);
app.use("/api/v1/pomodoro", pomodoroRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

//Serve upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
    message: "Welcome to Expense Tracker App API",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
