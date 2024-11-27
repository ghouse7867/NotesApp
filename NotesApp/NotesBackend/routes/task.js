module.exports = router;

const express = require('express');
const Task = require('../models/task');
const { jwtMiddleware } = require('../utils/jwt');

router.post('/tasks', async (req, res) => {
    const { name } = req.body;
    try {
        const newTask = new Task({ name });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: 'Error adding task to queue' });
    }
});

// GET /tasks: Returns the current status of tasks in the queue
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Simulate task completion (you can expand on this logic)
router.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status: 'completed' },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Error updating task' });
    }
});

module.exports = router;