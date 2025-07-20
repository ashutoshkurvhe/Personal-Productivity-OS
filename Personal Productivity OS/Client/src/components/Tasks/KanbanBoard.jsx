import React from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

const COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-slate-100 border-slate-200",
    headerColor: "text-slate-700",
    count: 0,
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-blue-50 border-blue-200",
    headerColor: "text-blue-700",
    count: 0,
  },
  {
    id: "review",
    title: "Review",
    color: "bg-yellow-50 border-yellow-200",
    headerColor: "text-yellow-700",
    count: 0,
  },
  {
    id: "done",
    title: "Done",
    color: "bg-green-50 border-green-200",
    headerColor: "text-green-700",
    count: 0,
  },
];

const KanbanBoard = ({
  tasks,
  onDelete,
  onEdit,
  openAddTaskModel,
  onReorder,
}) => {
  const [activeId, setActiveId] = useState(null);
  const [columns, setColumns] = useState(COLUMNS);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // Group tasks by status
  const getTasksByStatus = (status) => {
    return tasks
      .filter((task) => task.taskStatus === status)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  };

  // Update column counts
  const columnsWithCounts = columns.map((column) => ({
    ...column,
    count: getTasksByStatus(column.id).length,
  }));

  const findTaskById = (id) => {
    return tasks.find((task) => task._id === id);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the active task
    const activeTask = findTaskById(activeId);
    if (!activeTask) return;

    // Determine if we're hovering over a column or a task
    const isOverAColumn = columns.some((column) => column.id === overId);
    const isOverATask = tasks.some((task) => task._id === overId);

    if (isOverAColumn) {
      // Moving to a different column
      if (activeTask.taskStatus !== overId) {
        const updatedTask = {
          ...activeTask,
          taskStatus: overId,
          orderIndex: getTasksByStatus(overId).length,
        };

        onReorder([updatedTask]);
      }
    } else if (isOverATask) {
      // Moving within the same column or to a different position
      const overTask = findTaskById(overId);
      if (!overTask) return;

      if (activeTask.taskStatus !== overTask.taskStatus) {
        // Moving to a different column
        const updatedTask = {
          ...activeTask,
          taskStatus: overTask.taskStatus,
          orderIndex: overTask.orderIndex,
        };

        onReorder([updatedTask]);
      } else {
        // Reordering within the same column
        const columnTasks = getTasksByStatus(activeTask.taskStatus);
        const oldIndex = columnTasks.findIndex((task) => task._id === activeId);
        const newIndex = columnTasks.findIndex((task) => task._id === overId);

        if (oldIndex !== newIndex) {
          const reorderedTasks = arrayMove(columnTasks, oldIndex, newIndex);
          const updatedTasks = reorderedTasks.map((task, index) => ({
            ...task,
            orderIndex: index,
          }));

          onReorder(updatedTasks);
        }
      }
    }
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
  };

  const activeTask = activeId ? findTaskById(activeId) : null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800">Task Board</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              {tasks.length} Total Tasks
            </span>
          </div>
        </div>
        <button
          onClick={() => openAddTaskModel()}
          className="flex items-center space-x-2 add-btn hover:bg-red-900 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
            {columnsWithCounts.map((column) => (
              <SortableContext
                key={column.id}
                items={getTasksByStatus(column.id).map((task) => task._id)}
              >
                <KanbanColumn
                  column={column}
                  tasks={getTasksByStatus(column.id)}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onAddTask={() => openAddTaskModel(column.id)}
                />
              </SortableContext>
            ))}
          </div>

          {/* Drag Overlay */}
          {createPortal(
            <DragOverlay>
              {activeTask ? (
                <div className="rotate-3 opacity-95">
                  <TaskCard
                    task={activeTask}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    isDragging={true}
                  />
                </div>
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
