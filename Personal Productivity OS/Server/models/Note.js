const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
    {
        UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", requirred: true },
        title: { type: String, required: [true, "Notes title is required"],trim: true, },
        content: { type: String, required: [true, "Note content is required"], trim: true,},
        tags: { type: String, trim: true,},
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", },
        summary: {
            type: String,
            trim: true,
        },
    },{ timestamps: true}
)

module.exports = mongoose.model("Note", NoteSchema);