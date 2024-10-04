const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  completed: {
    type: Boolean,
    default: [false, "Please add a description"],
  },
  dueDate: {
    type: Date,
    required: [true, "Please add a due date"],
  },
  users: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: true,
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
