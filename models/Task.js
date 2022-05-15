import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Please provide Task name"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["done", "pending"],
      default: "pending",
    },
    taskType: {
      type: String,
      enum: ["A", "B", "C", "D", "E"],
      default: "A",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
