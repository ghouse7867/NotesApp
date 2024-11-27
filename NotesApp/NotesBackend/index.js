const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
const corsOptions = {
    origin: 'https://bookish-journey-pj74w957r9736wgq-5173.app.github.dev',
  };
app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));


app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
