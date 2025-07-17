import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  FaFlag,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const getPriorityBadge = (priority) => {
  const base =
    "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full";
  switch (priority) {
    case "high":
      return (
        <span className={`${base} bg-red-100 text-red-700`}>
          <FaFlag className="mr-1" /> High
        </span>
      );
    case "medium":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          <FaFlag className="mr-1" /> Medium
        </span>
      );
    case "low":
    default:
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          <FaFlag className="mr-1" /> Low
        </span>
      );
  }
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    pending: {
      name: "📝 Pending",
      items: [],
    },
    inProgress: {
      name: "🚧 In Progress",
      items: [],
    },
    completed: {
      name: "✅ Completed",
      items: [],
    },
  });

  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const createTask = (columnId) => {
    const newTask = {
      id: Date.now().toString(),
      title: "New Task",
      description: "Task description here...",
      priority: "low",
      createdAt: new Date(),
    };
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: [...prev[columnId].items, newTask],
      },
    }));
  };

  const deleteTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter((task) => task.id !== taskId),
      },
    }));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditedTask({ ...task });
  };

  const saveTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.map((t) =>
          t.id === taskId ? editedTask : t
        ),
      },
    }));
    setEditingId(null);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
      });
    } else {
      const destItems = [...destCol.items];
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems },
      });
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-gray-100 to-blue-100">
      <h1 className="text-4xl font-bold text-center mb-8">📌 Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {Object.entries(columns).map(([colId, col]) => (
            <Droppable key={colId} droppableId={colId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-full md:w-1/3 bg-white rounded-xl p-4 shadow-lg transition ${
                    snapshot.isDraggingOver ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{col.name}</h2>
                    <button
                      onClick={() => createTask(colId)}
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                    >
                      <FaPlus className="mr-1" /> Create Task
                    </button>
                  </div>

                  {col.items.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-3 p-4 rounded-lg border bg-white shadow-sm transition-all space-y-2 ${
                            snapshot.isDragging ? "bg-gray-100" : ""
                          }`}
                        >
                          {editingId === task.id ? (
                            <>
                              <input
                                className="w-full text-md font-bold border p-1 rounded"
                                value={editedTask.title}
                                onChange={(e) =>
                                  setEditedTask({
                                    ...editedTask,
                                    title: e.target.value,
                                  })
                                }
                              />
                              <textarea
                                className="w-full text-sm border p-1 rounded"
                                value={editedTask.description}
                                onChange={(e) =>
                                  setEditedTask({
                                    ...editedTask,
                                    description: e.target.value,
                                  })
                                }
                              />
                              <select
                                className="w-full text-sm border p-1 rounded"
                                value={editedTask.priority}
                                onChange={(e) =>
                                  setEditedTask({
                                    ...editedTask,
                                    priority: e.target.value,
                                  })
                                }
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                              <div className="flex justify-between items-center">
                                <button
                                  className="text-green-600 flex items-center gap-1 text-sm"
                                  onClick={() => saveTask(colId, task.id)}
                                >
                                  <FaSave /> Save
                                </button>
                                <button
                                  className="text-gray-600 flex items-center gap-1 text-sm"
                                  onClick={() => setEditingId(null)}
                                >
                                  <FaTimes /> Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <h3 className="text-md font-bold text-gray-800">
                                {task.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {task.description}
                              </p>
                              <div className="flex justify-between items-center text-xs">
                                {getPriorityBadge(task.priority)}
                                <span className="text-gray-500">
                                  {formatDistanceToNow(
                                    new Date(task.createdAt),
                                    { addSuffix: true }
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-end gap-3 text-sm pt-2">
                                <button
                                  className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                                  onClick={() => startEditing(task)}
                                >
                                  <FaEdit /> Edit
                                </button>
                                <button
                                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                                  onClick={() => deleteTask(colId, task.id)}
                                >
                                  <FaTrash /> Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
