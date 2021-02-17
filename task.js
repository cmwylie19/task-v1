const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema({
  title: String,
  listId: String,
  owner: String,
  completed: { type: Boolean, default: false },
  assigned: String,
  completedAt: Date,
  notes: { type: Array, default: [] },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", Task);
