import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NotesList() {
    const [notes, setNotes] = useState([]);


    const fetchNotes = async () => {
        try {
            const res = await axios.get('https://bookish-journey-pj74w957r9736wgq-5001.app.github.dev/notes');
            console.log(res)
            console.log(res.data)
            setNotes(res.data);
        } catch (err) {
            alert('Error fetching notes');
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/notes/${id}`);
            fetchNotes();
        } catch (err) {
            alert('Error deleting note');
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
                My Notes
            </h2>
            <div className="text-center mb-6">
                <Link
                    to="/create"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow transition duration-300"
                >
                    Create Note
                </Link>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {notes.map((note) => (
                    <li
                        key={note._id}
                        className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                            {note.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{note.content}</p>
                        <div className="flex justify-between items-center">
                            <Link
                                to={`/edit/${note._id}`}
                                className="text-blue-500 hover:text-blue-600 font-medium"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => deleteNote(note._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotesList;
