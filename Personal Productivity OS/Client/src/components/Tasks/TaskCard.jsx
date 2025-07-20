import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Calendar,
  Edit3,
  Trash2,
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    
  }

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "high":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: AlertCircle,
          label: "High",
        };
      case "medium":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock,
          label: "Medium",
        };
      case "low":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          label: "Low",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          label: "Low",
        };
    }
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
      <div className="flex items-start justify-between mb-3">
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
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        {/* Due Date */}
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          {task.dueDate && (
            <>
              <Calendar size={12} />
              <span className={isOverdue() ? "text-red-600 font-medium" : ""}>
                {formatDate(task.dueDate)}
              </span>
              {isOverdue() && (
                <span className="text-red-600 font-medium">(Overdue)</span>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
            title="Edit task"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task._id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
            title="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600 rounded-l-lg"></div>
    </div>
  );
};

export default TaskCard;
