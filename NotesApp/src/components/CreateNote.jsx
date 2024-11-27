import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            await axios.post('http://localhost:5005/notes', { title, content });
            navigate('/');
        } catch (err) {
            alert('Error creating note');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Note</h2>
            <form className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        placeholder="Note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                {/* Content Textarea */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Content</label>
                    <textarea
                        placeholder="Note content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="6"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                </div>
                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleCreate}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Create Note
                </button>
            </form>
        </div>
    );
}

export default CreateNote;
