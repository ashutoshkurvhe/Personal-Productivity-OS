import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-sm">{content}</p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          className="delete-btn"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
