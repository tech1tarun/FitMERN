// Node ES Modules imports (requires "type": "module" in package.json)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests from React
app.use(express.json()); // Parse incoming JSON payloads

// Basic route for testing server
app.get('/', (req, res) => {
    res.send('FitMERN API is running...');
});

import authRoutes from './src/routes/authRoutes.js';
import workoutRoutes from './src/routes/workoutRoutes.js';
import dietRoutes from './src/routes/dietRoutes.js';

// Map API Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diet', dietRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
