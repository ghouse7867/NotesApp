import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditNote() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get(`http://localhost:5005/notes/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (err) {
                alert('Error fetching note');
            }
        };

        fetchNote();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.put(`https://bookish-journey-pj74w957r9736wgq-5001.app.github.dev/notes/${id}`, { title, content });
            navigate('/');
        } catch (err) {
            alert('Error updating note');
        }
    };

    return (
        <>
        <div>
            <h2>Edit Note</h2>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleUpdate}>Update</button>
        </div>
        </>
    );
}

export default EditNote;
