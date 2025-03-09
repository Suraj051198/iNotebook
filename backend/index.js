require('dotenv').config();
const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors'); // Import cors

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Use cors middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.send('Hello, welcome to iNotebook backend!');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});