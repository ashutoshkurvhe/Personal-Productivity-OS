import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import NotesModel from "./NotesModel";
import { TiPinOutline } from "react-icons/ti";
// import { IoArchiveOutline } from "react-icons/io5";
// import { AiOutlineHeart } from "react-icons/ai";


const NoteCard = () => {
  const tags = ["tag1", "tag2", "tag3"]; // Default tags if none provided
  const [showNotesModel, setShowNotesModel] = React.useState(false);

  const handleOnClickThreeDots = () => {
    // Handle the click event for the three dots button
    console.log("Three dots clicked");
    setShowNotesModel(!showNotesModel);

  }
  return (
    <div className="flex flex-col justify-between bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300 max-h-[250px] relative">
      <div>
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl font-medium mb-4">This is Example note</h1>
          <div className="flex gap-5">
          <span className="bg-pink-200/50 rounded-full p-1"><TiPinOutline/></span>
          <button onClick={()=> handleOnClickThreeDots()}><BsThreeDotsVertical/></button>
          </div>
        </div>
        <p className="text-sm mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          aperiam et aliquam dicta. Nisi dolore...
        </p>
        <p className="text-sm mb-2">
          summary: Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <span className="text-gray-900 bg-gray-100 px-2 py-1 rounded-full">
          06-30
        </span>
      </div>

      {showNotesModel && (
        <NotesModel />)}
    </div>
  );
};

export default NoteCard;
