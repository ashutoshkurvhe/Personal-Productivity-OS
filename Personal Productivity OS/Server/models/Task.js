const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
      minlength: [5, "Description must be at least 5 characters"],
    },
    taskStatus: {
      type: String,
      enum: ["todo", "in-progress","review","done"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "review" ,"high"],
      default: "medium",
    },
    dueDate: { type: Date },
    orderIndex: { type: Number, default: 0 },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
