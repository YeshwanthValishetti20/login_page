const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user.model');
const mongoose = require('mongoose');



// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Continue with your code here, such as defining the UserActivation model
    const UserActivation = mongoose.model('UserActivation', new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    }));

    // Rest of your code
    // Registration route
    app.post('/api/register', async (req, res) => {
      console.log(req.body);
      try {
        await UserActivation.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        res.json({ status: 'ok' });
      } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' });
      }
    });

    // Hello route
    app.get('/hello', (req, res) => {
      res.send('Hello world');
    });

    // Login route
    app.post('/api/login', async (req, res) => {
      try {
        const user = await UserActivation.findOne({
          email: req.body.email,
          password: req.body.password,
        });

        if (user) {
          res.json({ status: 'ok', user: true });
        } else {
          res.json({ status: 'error', user: false });
        }
      } catch (err) {
        res.json({ status: 'error', error: 'Login error' });
      }
    });
    // const Task = mongoose.model('Task', taskSchema);
       // Create a new task and save it to the database
       const taskSchema = new mongoose.Schema({
        title: String,
        description: String,
        dueDate: Date,
        priority: String,
      });
    app.post('/api/tasks', async (req, res) => {
      try {
        // const { title, description, dueDate, priority } = req.body;
        console.log("entered into function");
        const newTask=new Task (req.body);
        const savedTask=newTask.save();

    
    
        // const Task2= new Task2({
        //   title,
        //   description,
        //   dueDate,
        //   priority,
        // });
        // console.log("created task"+Task2.toString());
        // await Task2.save();
    
        res.status(201).json({ savedTask });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Start the server
    const port = process.env.PORT || 1337;
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
