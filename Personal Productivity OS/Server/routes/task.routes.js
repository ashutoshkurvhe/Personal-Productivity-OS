const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
  reorderTasks,
} = require("../controllers/task.controller");


const router = express.Router();

router.post("/reorder", protect, reorderTasks);
router.post("/", protect, addTask);
router.get("/", protect, getAllTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
