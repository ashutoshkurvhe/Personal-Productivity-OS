const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addTask, getAllTasks, updateTask, deleteTask, recorderTasks } = require("../controllers/task.controller");

const router = express.Router();

router.post("/", protect, addTask);
router.get("/", protect, getAllTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.post("/recorder", protect, recorderTasks);


module.exports = router;