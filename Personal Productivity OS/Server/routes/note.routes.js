const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addNote, getAllNotes, deleteNote, updateNote, summarizeNote } = require("../controllers/note.controller");

const router = express.Router();

router.post("/", protect, addNote);
router.get("/", protect, getAllNotes);
router.updateNote("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.post("/:id/summarize", protect, summarizeNote);

module.exports = router;