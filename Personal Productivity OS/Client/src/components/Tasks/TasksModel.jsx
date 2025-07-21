import React from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const TasksModel = ({
  onDelete,
  onEdit,
  setShowTaskModel
}) => {

  return (
    <div className="flex flex-col justify-between gap-5 bg-black text-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300 max-h-[250px] max-w-[200px] absolute top-12 right-5 z-10000">
      <button
        className="flex items-center gap-2 px-2"
        onClick={() => { (onEdit)(); setShowTaskModel(false); }}
      >
        <AiOutlineEdit />
        Edit
      </button>
      <button
        className="flex items-center gap-2 px-2 text-red-500"
        onClick={() => { (onDelete)(); setShowTaskModel(false); }}
      >
        <MdOutlineDelete />
        Delete
      </button>
    </div>
  );
};

export default TasksModel
