import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

//
// 🔹Глобальні middleware
//
app.use(logger);
app.use(express.json());
app.use(cors());

// 🔹 Маршрути нотаток
app.use(notesRoutes);
//
// 404 і обробник помилок - наприкінці ланцюжка
app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();
// 🔹 Запуск сервера
//
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
