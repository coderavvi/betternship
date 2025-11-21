import React from 'react';

const NoteCard = ({ id, title, content, onClickEdit, onClickDelete }) => {
  return (
    <div>
      <div className="py-4 flex justify-between px-8 bg-stone-200 mb-2 shadow rounded-md hover:bg-stone-`300">
        <div>
          <h2 className="t`ext-xl font-bold">{title}</h2> <p>{content}</p>
        </div>
        <div className="flex gap-2">
          <div>
            <button
              className="bg-green-700 p-2 text-white shadow rounded-md hover:bg-green-800"
              onClick={() => onClickEdit(id)}
            >
              Edit Note
            </button>
          </div>
          <div>
            <button
              className="bg-red-700 p-2 text-white shadow rounded-md hover:bg-red-800"
              onClick={() => onClickDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
