const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addProject, deleteProject, getAllProjects, updateProject } = require("../controllers/project.controller")

const router = express.Router();

router.post("/", protect, addProject);
router.get("/", protect, getAllProjects);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;