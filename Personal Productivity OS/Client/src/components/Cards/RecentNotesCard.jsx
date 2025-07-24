import React from "react";
import { TiPinOutline } from "react-icons/ti";
import { IoArchiveOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegNoteSticky } from "react-icons/fa6";

const RecentNotesCard = ({
  title,
  content,
  type,
  tags,
  summary,
  createdAt,
}) => {
  const separatedTags = tags.split(",");

  const showType = (type) => {
    switch (type) {
      case "pinned":
        return (
          <span className="flex items-center gap-2 bg-pink-200/50 text-sm rounded-full py-1 px-2">
            <TiPinOutline/>
            {type}
          </span>
        );
      case "archived":
        return (
          <span className="flex items-center gap-2 bg-blue-200/50 text-sm rounded-full py-1 px-2">
            <IoArchiveOutline/>
            {type}
          </span>
        );
      case "favorite":
        return (
          <span className="flex items-center gap-2 bg-yellow-200/50 text-sm rounded-full py-1 px-2">
            <AiOutlineHeart/>
            {type}
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-2 bg-emerald-200/50 text-sm rounded-full py-1 px-2">
            <FaRegNoteSticky/>
            {type}
          </span>
        );
    }
  };

  return (
    <div className="card m-2">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-5">
          <h1 className="text-xl">{title}</h1>
          <div>{showType(type)}</div>
        </div>
        <p className="text-sm text-gray-600 ">{content}</p>
        <p className="text-sm text-gray-600 ">{summary}</p>
        <div className="flex justify-between">
          <div>

          {separatedTags.map((tag, index) => (
            <span
            key={index}
            className="text-sm bg-slate-200/50 mr-1 px-2 py-1 rounded-xl text-gray-800"
            >
              #{tag}
            </span>
          ))}
          </div>
          <p className="text-sm text-gray">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentNotesCard;
