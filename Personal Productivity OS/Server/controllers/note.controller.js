const Note = require("../models/Note");
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: "https://api.together.xyz/v1",
});

// Add note
exports.addNote = async (req, res) => {
  const userId = req.user.id;

  try {
    const { title, type, content, tags, summary } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newNote = new Note({
      userId,
      title,
      type,
      content,
      tags,
      summary,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Add Note Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all notes
exports.getAllNotes = async (req, res) => {
  const userId = req.user.id;

  try {
     const notes = await Note.find({ userId }).sort([
       ["type", 1], // Sort by type alphabetically: archived < favorite < normal < pinned
       ["createdAt", -1], // Optional: most recent first
     ]);

     // Optionally reverse the order if you want pinned > others
     const sortedNotes = [
       ...notes.filter((note) => note.type === "pinned"),
       ...notes.filter((note) => note.type !== "pinned"),
    ];
    res.status(200).json(sortedNotes);

  } catch (error) {
    console.error("Get Notes Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error("Update Note Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete Note Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Summarize note
exports.summarizeNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });

    const completion = await openai.chat.completions.create({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: "Summarize the following note:" },
        { role: "user", content: note.content },
      ],
    });

    const summary = completion.choices[0].message.content;
    note.summary = summary;
    await note.save();
    res.json({ summary });
  } catch (error) {
    console.error("Summarize Note Error:", error.message);
    res.status(500).json({ message: "Failed to summarize note" });
  }
};
