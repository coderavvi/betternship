const express = require('express');

const {
  getAllNotes,
  createNewNote,
  editNote,
  deleteNote,
} = require('./notes.controller');

const notesRouter = express.Router();

// get all notes route
notesRouter.get('/notes', getAllNotes);

//create a new note entry
notesRouter.post('/notes', createNewNote);

// edit note
notesRouter.patch('/notes/:id', editNote);

// delete note
notesRouter.delete('/notes/:id', deleteNote);

module.exports = notesRouter;
