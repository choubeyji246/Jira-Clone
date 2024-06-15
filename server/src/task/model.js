const mongoose = require("mongoose");

const assignedToSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  role: {
    type: String,
    required: [true, "Please enter role"],
  },
});

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, "Please enter project"],
    },
    name: {
      type: String,
      required: [true, "Please enter title"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    assignedTo: {
      type: assignedToSchema,
      required: [true, "Please provide assignee details"],
    },
    status: {
      type: String,
      default: "Todo",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);
module.exports = { Task, taskSchema };
