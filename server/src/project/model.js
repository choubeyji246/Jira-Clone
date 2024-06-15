const mongoose = require("mongoose");
const { taskSchema } = require("../task/model");
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    createdBy: {
      type: String,
      required: true,
    },
    members: {
      type: [],
      default: [],
    },
    tasks: [taskSchema],
  },
  { timestamps: true }
);
// Pre-save hook to add createdBy to members if not already included
projectSchema.pre("save", function (next) {
  const obj = { email: this.createdBy };
  this.members.push(obj);
  next();
});
const project = mongoose.model("Projects", projectSchema);
module.exports = { project };
