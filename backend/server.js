// Set up the express app
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;

// Set up mongoose
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://daniel:XsYFZilf5uUb33Lw@cluster0.bbi9ncr.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});
// Create a schema for the todo items
const ToDoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  done: Boolean,
});
// Create a model for the todo items
const todoDB = db.useDb('ToDoDB');
const toDoModel = todoDB.model('todo', ToDoSchema);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

app.get('/api', (req, res) => {
  return res.status(200).send({
    success: 'true',
    message: 'Welcome to the API',
  });
});

// Get all todos
app.get('/api/todos', (req, res) => {
  toDoModel
    .find()
    .exec()
    .then((todos) => {
      res.status(200).json(todos);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required',
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required',
    });
  }

  // insert into db
  const todo = new toDoModel({
    _id: new mongoose.Types.ObjectId(), // Generate a new id
    title: req.body.title,
    description: req.body.description,
    done: req.body.done,
  }).save();

  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    todo,
  });
});

// Get a single todo
app.get('/api/todos/:todoId', (req, res) => {
  const id = req.params.todoId;
  toDoModel
    .findById(id)
    .exec()
    .then((todo) => {
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({
          message: 'No valid entry found for provided ID',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Update a todo
app.put('/api/todos/:todoId', (req, res) => {
  const id = req.params.todoId;

  if (!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required',
    });
  }

  if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required',
    });
  }

  const data = {
    title: req.body.title,
    description: req.body.description,
    done: req.body.done,
  };

  toDoModel
    .update({ _id: id }, { $set: data })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Delete a todo
app.delete('/api/todos/:todoId', (req, res) => {
  const id = req.params.todoId;
  toDoModel
    .remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Delete all data from db and insert new data
app.post('/api/todos/reload', (req, res) => {
  toDoModel
    .remove({})
    .exec()
    .then((result) => {
      const todo1 = new toDoModel({
        _id: new mongoose.Types.ObjectId(),
        title: 'First todo',
        description: 'First todo description',
        done: true,
      }).save();
      const todo2 = new toDoModel({
        _id: new mongoose.Types.ObjectId(),
        title: 'Second todo',
        description: 'Second todo description',
        done: false,
      }).save();
      const todo3 = new toDoModel({
        _id: new mongoose.Types.ObjectId(),
        title: 'Third todo',
        description: 'Third todo description',
        done: true,
      }).save();
      const todo4 = new toDoModel({
        _id: new mongoose.Types.ObjectId(),
        title: 'Fourth todo',
        description: 'Fourth todo description',
        done: false,
      }).save();
      const todo5 = new toDoModel({
        _id: new mongoose.Types.ObjectId(),
        title: 'Fifth todo',
        description: 'Fifth todo description',
        done: false,
      }).save();
      const todo6 = new toDoModel({
        _id: new mongoose.Types.ObjectId(),
        title: 'Sixth todo',
        description: 'Sixth todo description',
        done: true,
      }).save();

      res.status(200).json({
        message: 'Data reloaded',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Set up the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
