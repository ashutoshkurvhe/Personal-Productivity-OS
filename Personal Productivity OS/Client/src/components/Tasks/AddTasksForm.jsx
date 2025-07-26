import React, { useState, useEffect } from "react";
import Dropdown from "../Inputs/Dropdown";

const AddTasksForm = ({ onAddTask, onUpdateTask, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    taskStatus: "pending",
    orderIndex: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        dueDate: initialData.dueDate ? initialData.dueDate.split("T")[0] : "",
        priority: initialData.priority || "medium",
        taskStatus: initialData.taskStatus || "pending",
        orderIndex: initialData.orderIndex || 0,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    initialData ? onUpdateTask(formData) : onAddTask(formData);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      taskStatus: "todo",
      orderIndex: 0,
    });
    setErrors({});
  };

  const statusOptions = ["todo", "in-progress", "review", "completed"];
  const priorityOptions = ["low", "medium", "high"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter task title..."
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
            errors.dueDate ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
        )}
      </div>

      <div>
        <Dropdown
          options={priorityOptions}
          value={formData.priority}
          onChange={(value) => handleDropdownChange("priority", value)}
        />
      </div>

      <div>
        <Dropdown
          options={statusOptions}
          value={formData.taskStatus}
          onChange={(value) => handleDropdownChange("taskStatus", value)}
        />
      </div>

      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className={`text-lg w-full border rounded p-2 ${
            errors.description ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder="Describe the task..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button type="submit" className="add-btn">
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default AddTasksForm;
