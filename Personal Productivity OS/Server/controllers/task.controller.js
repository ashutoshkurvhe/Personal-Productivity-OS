const Task = require("../models/Task");

//Add Task
exports.addTask = async (req, res) => {
  const userId = req.user.id;

  try {
    const {
      title,
      description,
      taskStatus,
      priority,
      dueDate,
      orderIndex,
    } = req.body;

    //Validate requirement fields
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Create new task
    const newTask = new Task({
      userId,
      title,
      description,
      taskStatus: taskStatus || "pending",
      priority: priority || "low",
      dueDate: dueDate ? new Date(dueDate) : null,
      orderIndex,
    });

    await newTask.save();
    res.status(200).json(newTask);
  } catch (error){
    console.error("Add Task Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

//Get all tasks
exports.getAllTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.find({ userId }).sort({ dueDate: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get All Tasks Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    console.error("Update Task Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reorder tasks
exports.reorderTasks = async (req, res) => {
  const updates = req.body; // [{id, orderIndex}, ...]

  if (!Array.isArray(updates)) {
    return res.status(400).json({ message: "Updates must be an array" });
  }

  try {
    for (const update of updates) {
      await Task.updateOne(
        { _id: update.id, userId: req.user.id },
        { orderIndex: update.orderIndex }
      );
    }
    res.json({ message: "Tasks reordered successfully" });
  } catch (error) {
    console.error("Reorder Tasks Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};