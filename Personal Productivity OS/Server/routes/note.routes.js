const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addNote, getAllNotes, deleteNote, updateNote, summarizeNote, getSingleNote } = require("../controllers/note.controller");

const router = express.Router();

router.post("/", protect, addNote);
router.get("/", protect, getAllNotes);
router.get("/:id", protect, getSingleNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.get("/:id/summarize", protect, summarizeNote);

module.exports = router;