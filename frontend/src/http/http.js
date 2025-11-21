import axios from 'axios';

const API_URL = 'http://localhost:3000/notes';

// get all notes
export async function getAllNotes() {
  const response = await axios.get(API_URL);

  return await response.data;
}

// edit note
export function createNote(note, noteId) {
  return axios.post(`${API_URL}/${noteId}`, note);
}

// delete note
export function deleteNote(noteId) {
  return axios.delete(`${API_URL}/${noteId}`);
}
