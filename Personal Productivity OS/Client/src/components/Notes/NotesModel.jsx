import React from 'react'
import { TiPinOutline } from "react-icons/ti";
import { IoArchiveOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";

const NotesModel = ({
  note,
  onDelete,
  onEdit,
  pin,
  unpin,
  archived,
  unarchived,
  favorite,
  unfavorite,
  setShowNotesModel,
}) => {
  const isPinned = note.type === "pinned";
  const isFavorite = note.type === "favorite";
  const isArchived = note.type === "archived";


  return (
    <div className="flex flex-col justify-between gap-5 bg-black text-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300 max-h-[250px] max-w-[200px] absolute top-12 right-5 z-10000">
      <button
        className="flex items-center gap-2 px-2"
        onClick={() => { (isFavorite ? unfavorite : favorite)(); setShowNotesModel(false); }}
      >
        <AiOutlineHeart />
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>
      <button
        className="flex items-center gap-2 px-2"
        onClick={() => { (isPinned ? unpin : pin)(); setShowNotesModel(false) }}
      >
        <TiPinOutline />
        {isPinned ? "Unpin" : "Pin"}
      </button>
      <button
        className="flex items-center gap-2 px-2"
        onClick={() => {
          (isArchived ? unarchived : archived)();
          setShowNotesModel(false);
        }}
      >
        <IoArchiveOutline />
        {isArchived ? "Unarchived" : "Archived"}
      </button>
      <button
        className="flex items-center gap-2 px-2"
        onClick={() => {onEdit(); setShowNotesModel(false) }}
      >
        <AiOutlineEdit />
        Edit
      </button>
      <button
        className="flex items-center gap-2 px-2 text-red-500"
        onClick={() => { onDelete(); setShowNotesModel(false); }}
      >
        <MdOutlineDelete />
        Delete
      </button>
    </div>
  );
};

export default NotesModel
