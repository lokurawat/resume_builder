// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import { connectDB } from './config/db.js';  // ← use named import here
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

// Middleware to handle CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Server uploads folder
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

try {
  await connectDB();
  app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
} catch (error) {
  console.error('❌ Backend startup failed:', error.message);
  process.exit(1);
}
