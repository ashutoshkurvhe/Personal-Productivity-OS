const Note = require("../models/Note");

//Add note
exports.addNote = async (req, res) => {
  const userId = req.body.id;

  try {
    const { title, content, tags, projectId, summary } = req.body;

    //Validate require fields
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Create new note
    const newNote = new Note({
      userId,
      title,
      content,
      tags,
      projectId,
      summary,
    });

    await newNote.save();
    res.status(200).json(newNote);
  } catch (error) {
    console.status(500).json({ message: "Sever Error" });
  }
};

//Get all notes
exports.getAllNotes = async (req, res) => {
    const userId = req.user.id;

    try {
        const note = await Note.find({ userId }).sort({ date: -1 });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

//Delete note
exports.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted succcessfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

};
exports.deleteAllNotes = async (req, res) => {};
exports.updateNote = async (req, res) => {};
