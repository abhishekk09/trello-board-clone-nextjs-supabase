"use client";
import React from "react";
import { FormEvent, useState, useRef } from "react";
import { addColumn } from "../../action/action";

const CreateColumn = ({ boardId, boardname }) => {
  const [showForm, setShowForm] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLFormElement>(null);

  const enableEditing = () => {
    setShowForm(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disbaleEditing = () => {
    setShowForm(false);
  };
  return (
    <>
      <div
        onClick={enableEditing}
        style={{
          display: !showForm ? "block" : "none",
        }}
        className="w-[270px] bg-[#f1f2f1] rounded p-4 text-sm justify-between gap-x-2 item-start opacity-60"
      >
        + Add Another List
      </div>
      <div
        className="w-[270px] rounded-md shadow-md text-sm justify-between gap-x-2 item-start"
        style={{
          display: showForm ? "block" : "none",
        }}
      >
        <form
          ref={ref}
          action={async (formData) => {
            const { data, error } = await addColumn(formData);
            if (!error) window.location.reload();
            ref.current?.reset();
            setShowForm(false);
          }}
        >
          <input
            ref={inputRef}
            placeholder={"Add title here..."}
            type="text"
            name="title"
            className="w-[250px] rounded-md bg-white shadow-md pt-2 px-2 text-sm justify-between gap-x-2 item-start m-2"
          />
          <input type="hidden" name="boardId" value={boardId} />
          <input type="hidden" name="boardname" value={boardname} />

          <div className="flex flex-row p-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 text-sm"
            >
              Add Task
            </button>
            <button type="reset" value="Reset" onClick={disbaleEditing}>
              x
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateColumn;
