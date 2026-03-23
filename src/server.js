import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pino from 'pino-http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//
// 🔹 Стандартні middleware
//
app.use(cors());
app.use(express.json());

//
// 🔹 Логер
//
app.use(pino());

//
// 🔹 Маршрути
//
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

//
// 🔹 Тестова помилка
//
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

//
// 🔹 404 middleware (ПІСЛЯ всіх маршрутів)
//
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

//
// 🔹 500 middleware (error handler)
//
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

//
// 🔹 Запуск сервера
//
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
