import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3000;

// 🔹 Middleware
app.use(logger);
app.use(express.json());
app.use(cors());

// 🔹 Routes
app.use(notesRoutes);

// 🔹 Error handling
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// 🔹 DB
await connectMongoDB();

// 🔹 Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
