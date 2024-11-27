const express = require('express');
const Note = require('../models/note');
const { jwtMiddleware } = require('../utils/jwt');

const router = express.Router();

// Create Note
router.post('/', jwtMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = new Note({
            title,
            content,
            userId: req.user.id,
        });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ error: 'Error creating note' });
    }
});

// Get Notes
router.get('/', jwtMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching notes' });
    }
});

// Update Note
router.put('/:id', jwtMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, content },
            { new: true }
        );
        if (!note) return res.status(404).json({ error: 'Note not found or unauthorized' });
        res.json(note);
    } catch (err) {
        res.status(400).json({ error: 'Error updating note' });
    }
});

// Delete Note
router.delete('/:id', jwtMiddleware, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ error: 'Note not found or unauthorized' });
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting note' });
    }
});

module.exports = router;
