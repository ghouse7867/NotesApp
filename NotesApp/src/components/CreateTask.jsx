// src/components/CreateTask.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
    const [taskName, setTaskName] = useState('');
    const navigate = useNavigate();

    const handleCreateTask = async () => {
        try {
            await axios.post('https://bookish-journey-pj74w957r9736wgq-5001.app.github.dev/tasks', { name: taskName });
            setTaskName('');
            navigate('/tasks'); 
            alert('Error creating task');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Create Task</h2>
            <input
                type="text"
                className="border border-gray-300 p-2 rounded mb-4 w-full"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCreateTask}
            >
                Add Task
            </button>
        </div>
    );
}

export default CreateTask;
