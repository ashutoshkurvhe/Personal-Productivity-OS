import React from "react";
import { useState } from "react";
import { IoSaveOutline } from "react-icons/io5";


const AddNotesForm = ({ onAddNote }) => {
  const [note, setNote] = useState({
    title: "",
    tags: "",
    content: "",
  });

  const handleChange = (key, value) => setNote({ ...note, [key]: value });
  return (
    <form onSubmit={() => onAddNote(note)} className="w-full">
      <div className="flex flex-col gap-10">
        <input
          value={note.title}
          onChange={({ target }) => handleChange("title", target.value)}
          placeholder="Note title"
          type="text"
          className="title text-2xl font-medium w-[100%] px-4"
        />

        <input
          value={note.tags}
          onChange={({ target }) => handleChange("tags", target.value)}
          placeholder="Add Tag "
          type="text"
          className="py-1 text-center max-w-[100px] mx-4 text-sm border-1 border-gray-500 rounded-md"
        />

        <textarea
          value={note.content}
          onChange={({ target }) => handleChange("content", target.value)}
          placeholder="start writing your notes... (markdown supported)"
          className="content min-h-[250px] px-4 border-1 border-gray-200 rounded-xl"
        />

        <button type="submit"
          className="add-btn max-w-[100px] self-end"
        >
          <IoSaveOutline />
          Save
        </button>
      </div>
    </form>
  );
};

export default AddNotesForm;


// const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.title.trim()) newErrors.title = "Title is required";
  //   if (!formData.description.trim())
  //     newErrors.description = "Description is required";

  //   if (formData.dueDate) {
  //     const selectedDate = new Date(formData.dueDate);
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     if (selectedDate < today)
  //       newErrors.dueDate = "Due date cannot be in the past";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   const taskData = {
  //     ...formData,
  //     dueDate: formData.dueDate || undefined,
  //   };

  //   if (initialData && onUpdateTask) {
  //     onUpdateTask(taskData);
  //   } else if (onAddTask) {
  //     onAddTask(taskData);
  //   }

  //   if (!initialData) {
  //     setFormData({
  //       title: "",
  //       description: "",
  //       dueDate: "",
  //       priority: "medium",
  //       taskStatus: "todo",
  //       orderIndex: 0,
  //     });
  //   }
  // };