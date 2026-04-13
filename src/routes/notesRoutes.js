import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

// 🔹 GET /notes
router.get('/', getAllNotesSchema, getAllNotes);

// 🔹 GET /notes/:noteId
router.get('/:noteId', noteIdSchema, getNoteById);

// 🔹 POST /notes
router.post('/', createNoteSchema, createNote);

// 🔹 DELETE /notes/:noteId
router.delete('/:noteId', noteIdSchema, deleteNote);

// 🔹 PATCH /notes/:noteId
router.patch('/:noteId', updateNoteSchema, updateNote);

export default router;
