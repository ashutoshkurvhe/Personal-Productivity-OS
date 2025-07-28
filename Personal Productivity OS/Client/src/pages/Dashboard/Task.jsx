import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import KanbanBoard from "../../components/Tasks/KanbanBoard";
import AddTasksForm from "../../components/Tasks/AddTasksForm";
import Model from "../../components/common/Model";
import DeleteModel from "../../components/common/DeleteModel";
import DeleteAlert from "../../components/common/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";

// Mock data and functions for demonstration

const Task = () => {
  useUserAuth()
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddTasksModel, setOpenAddTasksModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openEditTasksModel, setOpenEditTasksModel] = useState({
    show: false,
    data: null,
  });

  const fetchAllTasks = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Simulate API call
      const response = await axiosInstance.get(
        `${API_PATHS.TASKS.GET_ALL_TASKS}`
      );
      // In real app, this would be an API call

      if (response.data) {
        setTasksData(response.data);
      }
      console.log(response);
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (task) => {
    const { title, description, dueDate, priority, taskStatus, orderIndex } =
      task;

    if (!title || !description || !title.trim() || !description.trim()) {
      alert("All fields must be filled.");
      return;
    }

      try {
      await axiosInstance.post(API_PATHS.TASKS.ADD_TASK, {
        _id: Date.now().toString(),
        title,
        description,
        dueDate,
        priority,
        taskStatus,
        orderIndex,
      });
        
        // setTasksData((prev) => [...prev, newTask]);
        setOpenAddTasksModel(false);
        toast.success("Note added successfully.");
        fetchAllTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Something went wrong while adding the task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Simulate API call
      setTasksData((prev) => prev.filter((task) => task._id !== taskId));
      setOpenDeleteAlert({ show: false, data: null });
      alert("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      // Simulate API call
      setTasksData((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, ...updatedTask } : task
        )
      );
      setOpenEditTasksModel({ show: false, data: null });
      alert("Task updated successfully.");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleReorderTask = async (reorderedTasks) => {
    try {
      // Simulate API call
      if (Array.isArray(reorderedTasks)) {
        // Handle multiple tasks reordering
        const updatedTasks = [...tasksData];
        reorderedTasks.forEach((updatedTask) => {
          const index = updatedTasks.findIndex(
            (task) => task._id === updatedTask._id
          );
          if (index !== -1) {
            updatedTasks[index] = { ...updatedTasks[index], ...updatedTask };
          }
        });
        setTasksData(updatedTasks);
      } else {
        // Handle single task update
        setTasksData((prev) =>
          prev.map((task) =>
            task._id === reorderedTasks._id
              ? { ...task, ...reorderedTasks }
              : task
          )
        );
      }

      console.log("Tasks reordered successfully.");
    } catch (error) {
      console.error("Error reordering task:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        </div>

        {openAddTasksModel ? (
          <Model
            isOpen={openAddTasksModel}
            onClose={() => setOpenAddTasksModel(false)}
            title="Add Task"
            size="lg"
          >
            <AddTasksForm onAddTask={handleAddTask} />
          </Model>
        ) : openEditTasksModel.show ? (
          <Model
            isOpen={openEditTasksModel.show}
            onClose={() => setOpenEditTasksModel({ show: false, data: null })}
            title="Edit Task"
            size="lg"
          >
            <AddTasksForm
              initialData={openEditTasksModel.data}
              onUpdateTask={(updatedTask) =>
                handleUpdateTask(openEditTasksModel.data._id, updatedTask)
              }
            />
          </Model>
        ) : (
          <KanbanBoard
            tasks={tasksData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onEdit={(task) => setOpenEditTasksModel({ show: true, data: task })}
            openAddTaskModel={(status) => setOpenAddTasksModel(true)}
            onReorder={handleReorderTask}
          />
        )}
      </div>
      <DeleteModel
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task? This action cannot be undone."
          onDelete={() => handleDeleteTask(openDeleteAlert.data)}
          onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
        />
      </DeleteModel>
    </DashboardLayout>
  );
};

export default Task;
