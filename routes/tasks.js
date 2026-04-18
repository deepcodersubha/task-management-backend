const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const protect = require('../middleware/auth');

// GET — only fetch THIS user's tasks
router.get('/', protect, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }); // ← filter by user
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST — attach userId when creating
router.post('/', protect, async (req, res) => {
    console.log('req.user:', req.user);
    console.log('req.user.id:', req.user?.id);

    const task = new Task({
        title: req.body.title,
        userId: req.user.id,
    });
    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT — only update if task belongs to this user
router.put('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or not yours' });
        }
        task.title = req.body.title ?? task.title;
        task.completed = req.body.completed ?? task.completed;
        const updated = await task.save();
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE — only delete if task belongs to this user
router.delete('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or not yours' });
        }
        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;