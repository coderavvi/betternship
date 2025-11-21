import axios from 'axios';

const API_URL = 'http://localhost:3000/notes';

// get all notes
export async function getAllNotes() {
  const response = await axios.get(API_URL);

  const data = await response.data;
  return data;
}

// edit note
export function editNote(note, noteId) {
  const data = {
    title: note.title,
    content: note.content,
  };
  return axios.patch(`${API_URL}/${noteId}`, data);
}

// create new note
export function createNote(note) {
  const data = {
    title: note.title,
    content: note.content,
  };
  return axios.post(`${API_URL}`, data);
}

// delete note
export function deleteNote(noteId) {
  return axios.delete(`${API_URL}/${noteId}`);
}
