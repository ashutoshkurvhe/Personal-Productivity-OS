const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { savePomodoroSession, getPomodoroStats } = require("../controllers/pomodoro.controller");

const router = express.Router();

router.post("/session", protect, savePomodoroSession);
router.get("/stats", protect, getPomodoroStats);
