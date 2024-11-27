// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotesList from './components/NoteList';
import EditNote from './components/EditNote';
import CreateNote from './components/CreateNote';
import Login from './components/Login';
import Register from './components/Register';
import TaskQueue from './components/TaskQueue';
import CreateTask from './components/CreateTask';

function App() {
    return (
        <Router>
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <header className="bg-blue-600 text-white p-4 text-center">
                <Link to="/"><h1 className="text-3xl font-bold">Notes & Task Queue App</h1> </Link>
                    <nav className="mt-4">
                        <Link
                            to="/login"
                            className="text-white mr-4 hover:text-blue-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-white mr-4 hover:text-blue-300"
                        >
                            Register
                        </Link>
                        <Link
                            to="/tasks"
                            className="text-white mr-4 hover:text-blue-300"
                        >
                            Task Queue
                        </Link>
                    </nav>
                </header>
                <main className="flex-grow p-6">
                    <Routes>
                        <Route path="/" element={<NotesList />} />
                        <Route path="/create" element={<CreateNote />} />
                        <Route path="/edit/:id" element={<EditNote />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/tasks" element={<TaskQueue />} />
                        <Route path="/create-task" element={<CreateTask />} />
                    </Routes>
                </main>
                <footer className="bg-blue-600 text-white p-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Notes & Task Queue App</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
