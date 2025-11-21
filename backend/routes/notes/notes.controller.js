// get all notes
const { notes } = require('../../utils/notes');

function getAllNotes(req, res) {
  console.log(notes);

  res.status(200).send(notes);
}

// create new note
function createNewNote(req, res) {
  const { title, content } = req.body;
  const newNote = {
    id: notes.length + 1,
    title,
    content,
  };

  notes.push(newNote);
  res.status(201).send(newNote);
}

//edit existing note
function editNote(req, res) {
  const id = Number(req.params.id);

  const { title, content } = req.body;

  let selectedNote = notes.find((note) => note.id == id);
  const edittedNote = {
    id,
    title,
    content,
  };

  notes[id - 1] = edittedNote;

  res.status(200).send(notes);
}

//delete notes route

function deleteNote(req, res) {
  const id = Number(req.params.id);

  const updatedNotes = notes.filter((note) => note.id != id);

  notes = updatedNotes;
  res.status(200).send({ message: 'Deleted successfully' });
}

module.exports = {
  getAllNotes,
  createNewNote,
  editNote,
  deleteNote,
};
