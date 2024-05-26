"use client";
import React, { useState, useRef } from "react";

import ShowTaskList from "../components/ShowTaskList";
import { addCard } from "../action/action";
// import { Droppable } from "@hello-pangea/dnd";

export default function CreateTaskList({
  id,
  params,
  providedParent,
  refreshList,
  onCallBack,
}) {
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

  const formAction = async (formData) => {
    ref.current?.reset();
    const { data, error } = await addCard(formData, params);
    if (!error) window.location.reload();
    setShowForm(false);
  };

  return (
    <div>
      <ShowTaskList
        id={id}
        providedParent={providedParent}
        params={params}
        refreshList={refreshList}
        onCallBack={onCallBack}
      />
      {/* {provided.placeholder} */}
      <div
        onClick={enableEditing}
        style={{
          display: !showForm ? "block" : "none",
        }}
        className="w-[270px] rounded-md  p-2 px-2 text-sm justify-between gap-x-2 item-start pt-2 bg-green-200 mt-4"
      >
        + Add Task
      </div>
      <div
        className="w-[270px] rounded-md text-sm justify-between gap-x-2 item-start pt-2 mt-4"
        style={{
          display: showForm ? "block" : "none",
        }}
      >
        <form ref={ref} action={(formData) => formAction(formData)}>
          <input
            ref={inputRef}
            // onBlur={async (e) => {
            //   const formData = new FormData();
            //   formData.append("card", e.target.value);
            //   formData.append("boardId", id);
            //   await formAction(formData);
            // }}
            placeholder={"enter task here..."}
            type="text"
            name="card"
            className="w-[270px] rounded-md bg-white shadow-md px-2 text-sm justify-between gap-x-2 item-start "
          />
          <input type="hidden" name="boardId" value={id} />

          <div className="flex flex-row p-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 text-sm"
            >
              Add Task
            </button>
            <button type="reset" value="Reset" onClick={disbaleEditing}>
              X
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
