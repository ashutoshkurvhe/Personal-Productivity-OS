import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

const KanbanColumn = ({ column, tasks, onEdit, onDelete, onAddTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div
        className={`flex items-center justify-between p-4 rounded-t-lg  ${column.color}`}
      >
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold text-gray-600`}>
            {column.title}
          </h3>
          <span
            className={`bg-white px-2 py-1 rounded-full text-xs font-medium ${column.headerColor}`}
          >
            {column.count}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className={` flex items-center p-1 rounded-md hover:bg-white/50 transition-colors duration-200 text-gray-400`}
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Tasks Container */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-4 rounded-b-lg transition-colors duration-200 ${
          column.color
        } ${isOver ? "bg-opacity-70" : ""}`}
      >
        <SortableContext
          items={tasks.map((task) => task._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 min-h-[200px]">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-sm">No tasks yet</p>
                <button
                  onClick={onAddTask}
                  className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                >
                  Add your first task
                </button>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
