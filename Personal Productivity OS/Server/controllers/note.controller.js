const Note = require("../models/Note");
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: "https://api.together.xyz/v1", // <- Together.ai's API endpoint
});

//Add note
exports.addNote = async (req, res) => {
  const userId = req.user.id;

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
    res.status(500).json({ message: "Sever Error" });
  }
};

//Get all notes
exports.getAllNotes = async (req, res) => {
  const userId = req.user.id;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(note);
};

//Delete note
exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted succcessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//Summarize note
exports.summarizeNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
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
};
