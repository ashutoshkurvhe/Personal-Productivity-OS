const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addTask, getAllTasks, deleteTask } = require("../controllers/task.controller");

const router = express.Router();

router.post("/addTask", protect, addTask);
router.get("/getTasks", protect, getAllTasks);
router.delete("/deleteTask/:id", protect, deleteTask);

module.exports = router;