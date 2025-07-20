import React from "react";
import { useState } from "react";
import { IoSaveOutline } from "react-icons/io5";


const AddNotesForm = ({ onAddNote }) => {
  const [note, setNote] = useState({
    title: "",
    tags: "",
    content: "",
  });

  const handleChange = (key, value) => setNote({ ...note, [key]: value });
  return (
    <div className="h-[500px]">
      <div className="flex flex-col gap-10">
        <input
          value={note.title}
          onChange={({ target }) => handleChange("title", target.value)}
          placeholder="Note title"
          type="text"
          className="title text-2xl font-medium px-4"
        />

        <input
          value={note.tags}
          onChange={({ target }) => handleChange("tags", target.value)}
          placeholder="Add Tag "
          type="text"
          className="py-1 text-center max-w-[100px] mx-4 text-sm border-1 border-gray-500 rounded-md"
        />

        <textarea
          value={note.content}
          onChange={({ target }) => handleChange("content", target.value)}
          placeholder="start writing your notes... (markdown supported)"
          className="content min-h-[300px] px-4"
        />

        <button
          className="add-btn absolute bottom-5 right-5"
          onClick={() => onAddNote(note)}
        >
          <IoSaveOutline />
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNotesForm;
