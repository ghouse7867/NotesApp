// src/components/TaskQueue.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TaskQueue() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://bookish-journey-pj74w957r9736wgq-5001.app.github.dev/tasks');
            setTasks(response.data.tasks);
        } catch (error) {
            alert('Error fetching tasks');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Task Queue</h2>
            <div className="text-center mb-6">
                <Link
                    to="/create-task"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow transition duration-300"
                >
                    Create task
                </Link>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} className="border p-2 rounded mb-2">
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskQueue;
