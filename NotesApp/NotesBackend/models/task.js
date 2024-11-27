// src/models/taskModel.js
const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
