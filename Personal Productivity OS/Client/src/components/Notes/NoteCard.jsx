import React from "react";
import { useEffect, useRef ,useState} from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import NotesModel from "./NotesModel";
import { TiPinOutline } from "react-icons/ti";
import { IoArchiveOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegNoteSticky } from "react-icons/fa6";



const NoteCard = ({ note, onDelete, onEdit, onPin, onUnpin, onArchived, onUnarchived, onFavorite, onUnfavorite }) => {
  const [showNotesModel, setShowNotesModel] = useState(false);

  const {title, tags, type, content, createdAt} = note;
  const modalRef = useRef(null);

  const seperateTags = tags ? tags.split(",").map(tag => tag.trim()) : [];

  const showBadge = (type) => {
    switch (type) {
      case "pinned":
        return <span className="bg-pink-200/50 rounded-full p-1"><TiPinOutline /></span>;
      case "archived":
        return <span className="bg-blue-200/50 rounded-full p-1"><IoArchiveOutline/></span>;
      case "favorite":
        return <span className="bg-yellow-200/50 rounded-full p-1"><AiOutlineHeart/></span>;
      default:
        return <span className="bg-emerald-200/50 rounded-full p-1"><FaRegNoteSticky/></span>;
    }
  }

  const handleOnClickThreeDots = () => {
    // Handle the click event for the three dots button
    setShowNotesModel(!showNotesModel);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowNotesModel(false);
      }
    };

    if (showNotesModel) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotesModel]);

  return (
    <div className="flex flex-col justify-between bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300 min-h-[200px] relative">
      <div>
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl font-medium mb-4">{title}</h1>
          <div className="flex gap-5">
            {showBadge(type)}
            <button onClick={() => handleOnClickThreeDots()}>
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>
        <p className="text-sm mb-2">
          {content.length > 100 ? `${content.substring(0, 100)}...` : content}
        </p>
        <p className="text-sm mb-2">
          summary: Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {seperateTags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200/50 text-black px-2 py-1 rounded-full mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-900 bg-gray-100 px-2 rounded-full">
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {showNotesModel && (<div ref={modalRef} ><NotesModel note={note} onDelete={onDelete} onEdit={onEdit} pin={onPin} unpin={onUnpin} archived={onArchived} unarchived={onUnarchived} favorite={onFavorite} unfavorite={onUnfavorite} setShowNotesModel={setShowNotesModel} /> </div>)}
    </div>
  );
};

export default NoteCard;
