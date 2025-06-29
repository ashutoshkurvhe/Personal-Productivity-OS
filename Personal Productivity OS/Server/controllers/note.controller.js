const Note = require("../models/Note");


//Add note
exports.addNote = async (req, res) => {
    const userId = req.body.id;

    try {
        const { title, content, tags, projectId, summary } = req.body;
        
        //Validate require fields
        if (!title || !content) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //Create new note
        const newNote = new Note({
          title,
          content,
          tags,
          projectId,
          summary,
        });

        await newNote.save();
        res.status(200).json(newNote);
    } catch (error) {
        console.status(500).json({ message: 'Sever Error' });
    }
};
exports.getAllNotes = async (req, res) => {};
exports.deleteNote = async (req, res) => {};
exports.deleteAllNotes = async (req, res) => {};
exports.updateNote = async (req, res) => {};