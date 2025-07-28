import React from "react";
import { TiPinOutline } from "react-icons/ti";
import { IoArchiveOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";


const NotesDetails = ({ noteData, onSummarized }) => {
  const { title, tags, type, content, createdAt, summary, updatedAt } =
    noteData;

  const separateTags = tags ? tags.split(",").map((tag) => tag.trim()) : [];

  const showType = (type) => {
    switch (type) {
      case "pinned":
        return (
          <span className="flex items-center gap-2 bg-pink-200/50 text-sm rounded-full py-1 px-2">
            <TiPinOutline />
            {type}
          </span>
        );
      case "archived":
        return (
          <span className="flex items-center gap-2 bg-blue-200/50 text-sm rounded-full py-1 px-2">
            <IoArchiveOutline />
            {type}
          </span>
        );
      case "favorite":
        return (
          <span className="flex items-center gap-2 bg-yellow-200/50 text-sm rounded-full py-1 px-2">
            <AiOutlineHeart />
            {type}
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-2 bg-emerald-200/50 text-sm rounded-full py-1 px-2">
            <FaRegNoteSticky />
            {type}
          </span>
        );
    }
  };

  return (
    <div className="w-full md:min-h-[500px]">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">{title}</h1>
          <div className="flex gap-4">
            <button className="flex gap-2 items-center border-1 p-2 bg-black text-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onSummarized(noteData._id);
              }}
            >
              {<FaWandMagicSparkles />}
              <span className="hidden md:flex">Summarize</span>
            </button>
            {showType(type)}
          </div>
        </div>
        <p className="text-gray-600">
          <span className="text-gray-900 text-xl font-medium">Content -</span>{" "}
          {content}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-900 text-xl font-medium">Summary -</span>{" "}
          {summary?.length > 0 ? summary : ""}
        </p>
        <div className="flex justify-between ">
          <div className="flex flex-wrap gap-3">
            {separateTags?.map((tag, index) => (
              <span
                key={index}
                className="bg-slate-200/50 px-3 py-1 rounded-2xl"
              >
                # {tag}
              </span>
            ))}
          </div>

          <div className="md:flex gap-3">
            <span className="text-sm text-center text-white bg-black px-2 py-1 min-w-[100px] h-7 rounded-full">
              {new Date(createdAt)?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="text-sm text-center text-white bg-black px-2 py-1 min-w-[100px] h-7 rounded-full">
              {new Date(updatedAt)?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesDetails;
