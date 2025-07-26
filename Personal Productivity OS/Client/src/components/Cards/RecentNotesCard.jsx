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
  const separateTags = tags.split(",");

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
      </div>
    </div>
  );
};

export default RecentNotesCard;
