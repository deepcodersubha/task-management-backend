const express = require('express');
const router = express.Router(); // a mini-app to define routes
const Task = require('../models/Task');

// GET /api/tasks — Read ALL tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // MongoDB: SELECT * FROM tasks
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks — Create a task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title, // data comes from the request body
  });
  try {
    const savedTask = await task.save(); // INSERT INTO tasks
    res.status(201).json(savedTask); // 201 = "Created"
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 = bad request
  }
});

// PUT /api/tasks/:id — Update a task
router.put('/:id', async (req, res) => {
  try {
    // findByIdAndUpdate(id, updates, {new: true}) returns the UPDATED doc
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, completed: req.body.completed },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id — Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;