import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onAdd }) => {
  const [boardTitle, setBoardTitle] = useState("");

  if (!isOpen) return null;
  return (
    <div className="flex items-center justify-center z-50 absolute left-[400px]">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Create Board</h2>
        <input
          type="text"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 text-sm"
          placeholder="Board Title"
        />
        <div className="flex justify-end">
          <button
            onClick={() => {
              onAdd(boardTitle);
              setBoardTitle("");
              onClose();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
