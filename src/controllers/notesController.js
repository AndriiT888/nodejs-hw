// src/controllers/notesController.js

import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// створити нову нотатку
  export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};
// видалити нотатку
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    throw createHttpError(404, "Note not found");
  }

  res.status(200).json(note);
};

// Оновити нотатку
export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId }, // Шукаємо по id
    req.body,
    { returnDocument: "after" }, // повертаємо оновлений документ
  );

  if (!note) {
	throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

// Отримати список усіх нотаток
export const getAllNotes = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    tag,
    search,
  } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const skip = (pageNumber - 1) * perPageNumber;

  const filter = {};

  // 🔹 Фільтр по тегу
  if (tag) {
    filter.tag = tag;
  }

  // 🔹 Пошук через text index
  if (search && search.trim() !== '') {
    filter.$text = { $search: search };
  }

  const [totalNotes, notes] = await Promise.all([
    Note.countDocuments(filter),
    Note.find(filter)
      .skip(skip)
      .limit(perPageNumber),
  ]);

  const totalPages = Math.ceil(totalNotes / perPageNumber);

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalNotes,
    totalPages,
    notes,
  });
};

// Отримати одну нотатку за id
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

 if (!note) {
	throw createHttpError(404, 'Note not found');
  }


  res.status(200).json(note);
};
