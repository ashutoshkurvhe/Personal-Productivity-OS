const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addNote, getAllNotes, deleteNote } = require("../controllers/note.controller");

const router = express.Router();

router.post("/addNote", protect, addNote);
router.get("/getAllNotes", protect, getAllNotes);
router.delete("/deleteNote/:id", protect, deleteNote);

module.exports = router;