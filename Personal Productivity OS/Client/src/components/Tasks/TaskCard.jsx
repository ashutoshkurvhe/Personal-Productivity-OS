import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BsThreeDotsVertical } from "react-icons/bs";
import TasksModel from "./TasksModel";
import { getPriorityConfig } from "../../utils/helper";
import {
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle,
} from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task._id,
  });
  const [showTaskModel, setShowTaskModel] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOnClickThreeDots = () => {
    setShowTaskModel(!showTaskModel);
  };



  const priorityConfig = getPriorityConfig(task.priority);
  const PriorityIcon = priorityConfig.icon;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = () => {
    if (!task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.taskStatus !== "done";
  };

  const cardClasses = `
    bg-white rounded-lg border border-gray-200 p-4 cursor-grab active:cursor-grabbing
    shadow-sm hover:shadow-md transition-all duration-200
    ${isDragging || isSortableDragging ? "opacity-50 shadow-lg scale-105" : ""}
    ${isOverdue()}
  `;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cardClasses}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-3 relative">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate mb-1">
            {task.title}
          </h4>
          <p className="text-sm text-gray-600 line-clamp-2">
            {task.description}
          </p>
        </div>

        {/* Priority Badge */}
        <div
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${priorityConfig.color} ml-2`}
        >
          <PriorityIcon size={12} />
          <span>{priorityConfig.label}</span>
        </div>
        <button onClick={() => handleOnClickThreeDots()}>
          <BsThreeDotsVertical />
        </button>

        {showTaskModel && <TasksModel onDelete={onDelete} onEdit={onEdit} />}
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        {/* Due Date */}
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          {task.dueDate && (
            <>
              <Calendar size={12} />
              <span
                className={isOverdue() ? "text-gray-900/50 font-medium" : ""}
              >
                {formatDate(task.dueDate)}
              </span>
              {isOverdue() && (
                <span className="text-gray-900/50 font-medium">(Overdue)</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
