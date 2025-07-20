const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Note title is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["pinned", "favorite", "archived", "normal"],
      default: "normal",
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
    },
    tags: { type: String, trim: true },
    // projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    summary: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
