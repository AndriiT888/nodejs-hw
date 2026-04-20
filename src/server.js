import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';  // ← ДОДАЙ

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { authenticate } from './middleware/authenticate.js';  // ← Додай якщо є
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';  // ← Додай auth routes
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(logger);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET ?? 'dev-secret'));  // ← З secret
app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);  // ← Публічні: register/login
app.use(authenticate);  // ← Захист для приватних
app.use('/api/notes', notesRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// DB & Start
await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
