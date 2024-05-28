import express from 'express';
import authRoutes from './routes/authRoutes';
import lessonRoutes from './routes/lessonRoutes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/lessons', lessonRoutes);

export default app;

