// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/notesRoutes');

// Load environment variables from .env file
dotenv.config();
const app = express(); // Initialize Express application

// Middleware
app.use(express.json()); 
app.use(cors());  

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Function to connect to MongoDB and start the server
const startServer = async () => {
    try {
        // Attempt to connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        console.log('DB connected ^_^');

        // Start listening for incoming requests only after DB connection succeeds
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

// Execute the function
startServer();
