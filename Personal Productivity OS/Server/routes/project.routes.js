const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addProject, deleteProject, getAllProjects } = require("../controllers/project.controller")

const router = express.Router();

router.post("/addProject", protect, addProject);
router.get("/getAllProjects", protect, getAllProjects);
router.delete("/deleteProject/:id", protect, deleteProject);

module.exports = router;