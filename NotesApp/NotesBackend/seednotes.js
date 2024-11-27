const mongoose = require('mongoose');
const Note = require('./models/note'); 
const User = require('./models/user'); 
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Find or create a sample user
        User.findOne({ username: 'sampleuser' }).then(user => {
            if (!user) {
                User.create({ username: 'sampleuser', password: 'password' }).then(user => {
                    addSampleNotes(user._id);
                });
            } else {
                addSampleNotes(user._id);
            }
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

function addSampleNotes(userId) {
    const sampleNotes = [
        { title: 'Sample Note 1', content: 'This is the content of Sample Note 1', userId },
        { title: 'Sample Note 2', content: 'This is the content of Sample Note 2', userId },
        { title: 'Sample Note 3', content: 'This is the content of Sample Note 3', userId },
    ];

    Note.insertMany(sampleNotes)
        .then(notes => {
            console.log('Sample notes added:', notes);
            mongoose.connection.close();
        })
        .catch(err => {
            console.error('Error inserting sample notes:', err);
            mongoose.connection.close();
        });
}
