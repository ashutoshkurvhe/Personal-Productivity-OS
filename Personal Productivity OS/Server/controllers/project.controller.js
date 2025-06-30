const Project = require("../models/Project");

// Add Project
exports.addProject = async (req, res) => {
  const userId = req.user.id;

  try {
    const { title, type, color } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Project title is required" });
    }

    const newProject = new Project({
      userId,
      title,
      type,
      color,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Add Project Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  const userId = req.user.id;

  try {
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Get Projects Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Update Project Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
