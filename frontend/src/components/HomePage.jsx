import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllNotes } from '../http/http';
import NoteCard from './NoteCard';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  // fetch
  useEffect(() => {
    async function fetchNotes() {
      const fetchedNotes = await getAllNotes();

      setNotes(fetchedNotes);
    }

    fetchNotes();
  }, [notes]);

  return (
    <div className="">
      <div className="flex gap-4">
        <div className="w-[20rem] bg-stone-700 min-h-[100vh] flex gap-2 px-4 pt-24 justify-center">
          <div>
            <button className="bg-blue-700 p-2 text-white shadow rounded-md hover:bg-blue-800">
              Add Note
            </button>
          </div>{' '}
        </div>

        <div className="flex-1 pr-4">
          <header className=" flex justify-center w-full py-8">
            <h2 className="text-3xl font-bold text-stone-800">Notes App</h2>
          </header>
          <div>
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                content={note.content}
                title={note.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
