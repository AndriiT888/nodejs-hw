// src/controllers/notesController.js

import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// створити нову нотатку
 export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id, // 🔥 головне
  });

  res.status(201).json(note);
};
// видалити нотатку
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

// Оновити нотатку
export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      userId: req.user._id,
    },
    req.body,
    { returnDocument: 'after' }  // ✅ Замінено new: true
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

// Отримати список усіх нотаток
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const skip = (page - 1) * perPage;

  const filter = {
    userId: req.user._id, // 🔥 тільки свої
  };

  if (tag) {
    filter.tag = tag;
  }

  if (search && search.trim() !== '') {
    filter.$text = { $search: search };
  }

  const [totalNotes, notes] = await Promise.all([
    Note.countDocuments(filter),
    Note.find(filter)
      .skip(Number(skip))
      .limit(Number(perPage)),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

// Отримати одну нотатку за id
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
