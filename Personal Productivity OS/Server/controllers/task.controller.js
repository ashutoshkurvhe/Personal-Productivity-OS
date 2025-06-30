const Task = require('../models/Task');

//Add Task 
exports.addTask = async (req, res) => {
    const userId = req.user.id;

    try {
        const { title, description, projectId, status, priority, dueDate, orderIndex } = req.body;
        
        //Validate requirement fields
        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //Create new task
        const newTask = new Task({
            userId,
            title,
            description,
            projectId,
            status,
            priority,
            date: new Date(dueDate),
            orderIndex,
        });

        await newTask.save();
        res.status(200).json(newTask);
    } catch {
        res.status(500).json({ message: 'Server Error' });
    }
};

//Get all tasks 
exports.getAllTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        const tasks = await Task.find({ userId }).sort({ date: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


//Update task
exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
};


//Delete task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// Reorder task
exports.recorderTasks = async (req, res) => {
  const updates = req.body; // [{id, orderIndex}, ...]
  for (const update of updates) {
    await Task.updateOne(
      { _id: update.id, userId: req.user._id },
      { orderIndex: update.orderIndex }
    );
  }
  res.json({ message: "Tasks reordered" });
};