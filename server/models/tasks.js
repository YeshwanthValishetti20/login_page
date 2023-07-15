const express = require('express');
const mongoose = require('mongoose');

// Create a new Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
});

// Create a Task model
const Task = mongoose.model('Task', taskSchema);

// Define the routes
app.get('/api/tasks', async (req, res) => {
  try {
    console.log("entered into function")
    // Fetch all tasks from the database
    const tasks = await Task.find();
    console.log(tasks);

    res.json({ tasks });
    console.log(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    console.log("entered into function");

    // Create a new task and save it to the database
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
    });
    console.log("created task"+task.toString());
    await task.save();

    res.status(201).json({ task });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task by ID and delete it from the database
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority } = req.body;

    // Find the task by ID and update its fields
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, priority },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = 1337;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
