import React from "react";
import { LuPlus } from "react-icons/lu";
import { useState, useEffect } from "react";
import NoteCard from "./NoteCard"; // Assuming you have a NoteCard component to display individual notes

const NotesList = ({
  notes,
  onDelete,
  onEdit,
  onPin,
  onUnpin,
  onArchived,
  onUnarchived,
  onFavorite,
  onUnfavorite,
  onSummarized,
  onClickNote,
  onClickNoteDetails
}) => {
  const [activeType, setActiveType] = useState("all");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    if (activeType === "all") {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(notes.filter((note) => note.type === activeType));
    }
  }, [activeType, notes]);

  const tabs = [
    { type: "all", label: "All" },
    { type: "pinned", label: "Pinned" },
    { type: "archived", label: "Archived" },
    { type: "favorite", label: "Favorite" },
  ];

  return (
    <div className="">
      <div className="p-2">
        {/* Tabs Navigation*/}
        <div className="flex md:gap-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              onClick={() => {
                setActiveType(tab.type);
              }}
              className={`px-4 py-2  text-sm font-medium transiton duration-50 ${
                activeType === tab.type
                  ? "border-b-3  border-slate-400 text-black "
                  : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes?.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={() => onDelete(note._id)}
            onEdit={() => onEdit(note._id)}
            onPin={() => onPin(note._id)}
            onUnpin={() => onUnpin(note._id)}
            onArchived={() => onArchived(note._id)}
            onUnarchived={() => onUnarchived(note._id)}
            onFavorite={() => onFavorite(note._id)}
            onUnfavorite={() => onUnfavorite(note._id)}
            onSummarized={() => onSummarized(note._id)}
            onClickNote={() => onClickNote(note._id)}
            onClickNoteDetails={onClickNoteDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
