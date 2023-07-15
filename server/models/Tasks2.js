
const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true,unique: true },
  dueDate: { type: String, required: true },
  priority: { type: String, required: true },
  quote: String,
}, { collection: 'tasks-data' });

const tasksModel = mongoose.model('tasks', tasksSchema);

module.exports = tasksModel;
