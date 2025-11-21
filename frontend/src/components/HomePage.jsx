import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteNote, editNote, getAllNotes, createNote } from '../http/http';
import NoteCard from './NoteCard';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [mode, setMode] = useState('view');
  const [refresh, setRefresh] = useState(false);

  const [inputValue, setInputValue] = useState(null);

  function hadleStartAddNote() {
    setMode('add');
  }

  function handleStartEditNote(id) {
    setMode('edit');
    const selectedNote = notes.find((note) => note.id == id);
    setInputValue({
      id: id,
      title: selectedNote.title,
      content: selectedNote.content,
    });
  }

  // fetch
  useEffect(() => {
    async function fetchNotes() {
      const fetchedNotes = await getAllNotes();

      setNotes(fetchedNotes);
    }
    fetchNotes();
  }, [mode, refresh]);

  // update note
  async function hanldeUpdateNote(event, noteId, noteData) {
    event.preventDefault();
    console.log('data: ', noteData);

    await editNote(noteData, noteId);
    setMode('view');
    setRefresh((prev) => !prev);
  }

  // delete note
  async function handleDeleteNote(noteId) {
    await deleteNote(noteId);
    console.log('deleted');

    setMode('view');
    setRefresh((prev) => !prev);
  }

  // create note
  async function handleCreateNote(event, noteData) {
    event.preventDefault();
    await createNote(noteData);
    setMode('view');
    setRefresh((prev) => !prev);
  }

  let displayedContent = (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          content={note.content}
          id={note.id}
          title={note.title}
          onClickEdit={handleStartEditNote}
          onClickDelete={handleDeleteNote}
        />
      ))}
    </div>
  );

  if (mode === 'add') {
    displayedContent = (
      <div>
        <h2 className="text-2xl font-bold mb-4">Add a New Note</h2>
        <form
          onSubmit={(event) => handleCreateNote(event, inputValue)}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="p-2 border border-stone-300 rounded"
            onChange={(event) =>
              setInputValue((prevValue) => ({
                ...prevValue,
                title: event.target.value,
              }))
            }
          />
          <textarea
            placeholder="Content"
            className="p-2 border border-stone-300 rounded h-40"
            onChange={(event) =>
              setInputValue((prevValue) => ({
                ...prevValue,
                content: event.target.value,
              }))
            }
          ></textarea>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-700 p-2 text-white shadow rounded-md hover:bg-green-800"
            >
              Save Note
            </button>

            <button
              type="submit"
              className="bg-gray-700 p-2 text-white shadow rounded-md hover:bg-gray-800"
              onClick={() => setMode('view')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (mode === 'edit') {
    displayedContent = (
      <div>
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) =>
            hanldeUpdateNote(event, inputValue.id, inputValue)
          }
        >
          <input
            type="text"
            placeholder="Title"
            className="p-2 border border-stone-300 rounded"
            value={inputValue.title}
            onChange={(event) =>
              setInputValue((prevValue) => ({
                ...prevValue,
                title: event.target.value,
              }))
            }
          />
          <textarea
            placeholder="Content"
            className="p-2 border border-stone-300 rounded h-40"
            value={inputValue.content}
            onChange={(event) =>
              setInputValue((prevValue) => ({
                ...prevValue,
                content: event.target.value,
              }))
            }
          ></textarea>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-yellow-700 p-2 text-white shadow rounded-md hover:bg-yellow-800"
            >
              Update Note
            </button>
            <button
              type="submit"
              className="bg-gray-700 p-2 text-white shadow rounded-md hover:bg-gray-800"
              onClick={() => setMode('view')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex gap-4">
        <div className="w-[20rem] bg-stone-700 min-h-[100vh] flex gap-2 px-4 pt-24 justify-center">
          <div>
            <button
              className="bg-blue-700 p-2 text-white shadow rounded-md hover:bg-blue-800"
              onClick={hadleStartAddNote}
            >
              Add Note
            </button>
          </div>{' '}
        </div>

        <div className="flex-1 pr-4">
          <header className=" flex justify-center w-full py-8">
            <h2 className="text-3xl font-bold text-stone-800">Notes App</h2>
          </header>
          {displayedContent}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
