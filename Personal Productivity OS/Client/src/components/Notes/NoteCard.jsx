import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import NotesModel from "./NotesModel";
import { TiPinOutline } from "react-icons/ti";
import { IoArchiveOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegNoteSticky, FaWandMagicSparkles } from "react-icons/fa6";


const NoteCard = ({
  note,
  onDelete,
  onEdit,
  onPin,
  onUnpin,
  onArchived,
  onUnarchived,
  onFavorite,
  onUnfavorite,
  onSummarized,
  onClickNoteDetails,
  onClickNote
}) => {
  const [showNotesModel, setShowNotesModel] = useState(false);

  const { title, tags, type, content, createdAt, summary } = note;
  const modalRef = useRef(null);

  const separateTags = tags ? tags.split(",").map((tag) => tag.trim()) : [];

  const showBadge = (type) => {
    switch (type) {
      case "pinned":
        return (
          <span className="bg-pink-200/50 rounded-full p-1">
            <TiPinOutline />
          </span>
        );
      case "archived":
        return (
          <span className="bg-blue-200/50 rounded-full p-1">
            <IoArchiveOutline />
          </span>
        );
      case "favorite":
        return (
          <span className="bg-yellow-200/50 rounded-full p-1">
            <AiOutlineHeart />
          </span>
        );
      default:
        return (
          <span className="bg-emerald-200/50 rounded-full p-1">
            <FaRegNoteSticky />
          </span>
        );
    }
  };

  const handleOnClickThreeDots = () => {
    // Handle the click event for the three dots button
    setShowNotesModel(!showNotesModel);
  };

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
    <div
      onClick={(e) => { e.stopPropagation(); onClickNote(note._id); onClickNoteDetails(true)}}
      className="flex flex-col justify-between shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300  min-h-[200px] relative"
    >
      <div>
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl font-medium mb-4 text-wrap md:max-w-[300px]">{title}</h1>
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSummarized(note._id);
              }}
            >
              {<FaWandMagicSparkles />}
            </button>
            {showBadge(type)}
            <button onClick={(e) => { e.stopPropagation(); handleOnClickThreeDots() }}>
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>
        <p className="text-sm mb-2">
          {content?.length > 100 ? `${content.substring(0, 100)}...` : content}
        </p>
        <p className="text-sm mb-2">
          {summary?.length > 100 ? `${summary?.substring(0, 100)}...` : summary}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="hidden md:flex flex-wrap">
          {separateTags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200/50 text-black px-2 py-1 rounded-full mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex md:hidden">
          <span className="text-xs bg-gray-200/50 text-black px-2 py-1 rounded-full mr-2 mb-2">
            #{separateTags[0]}
          </span>
          <span>+{separateTags.length - 1}</span>
        </div>
        <span className="text-sm text-center text-white bg-black px-2 py-1 min-w-[100px] rounded-full">
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {showNotesModel && (
        <div ref={modalRef}>
          <NotesModel
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
            pin={onPin}
            unpin={onUnpin}
            archived={onArchived}
            unarchived={onUnarchived}
            favorite={onFavorite}
            unfavorite={onUnfavorite}
            setShowNotesModel={setShowNotesModel}
          />
        </div>
      )}
    </div>
  );
};

export default NoteCard;
