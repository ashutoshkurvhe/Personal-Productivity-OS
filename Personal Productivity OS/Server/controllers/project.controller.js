const Project = require("../models/Project");

exports.addProject = async (req, res) => {
    const userId = req.user.id;

    try {
        const { title, type, color } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: "All fields are required" }); 
        }

        //Create new projecgt
        const newProject = new Project({
            userId,
            title,
            type,
            color,
        });

        await newProject.save();
        res.status(200).json(newProject)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

//Get all projects
exports.getAllProjects = async (req, res) => {
    const userId = req.user.id;

    try {
        const projects = await Project.find({ userId });
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// Update project
exports.updateProject = async (req, res) => {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(project);
};
  

//Delete project
exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted successfully' });
    } catch {
        res.status(500).json({message: 'Server Error'})
    }
};