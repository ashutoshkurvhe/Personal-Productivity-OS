const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,},
        title: { type: String, required: [true, "Project title is required"], trim: true },
        type: { type: String, enum: ["task", "note",] },
        color: { type: String, trim: true, default: "#3882F6", },
    }, { timestamp: true, }
);

module.exports = mongoose.model("Project", ProjectSchema);