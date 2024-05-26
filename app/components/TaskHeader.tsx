"use client";

import React, { useRef, useState } from "react";
import { updateCard } from "../action/action";

export default function TaskHeader({ data, params }) {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disbaleEditing = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (formData) => {
    formRef.current?.reset();
    const { data, error } = await updateCard(formData);
    if (!error) window.location.reload();
    setIsEditing(false);
  };

  return (
    <div className="w-[270px] pt-2 px-2 text-sm justify-between gap-x-2 item-start">
      {isEditing ? (
        <form ref={formRef} action={handleSubmit}>
          <input
            ref={inputRef}
            placeholder={"Enter Title Here..."}
            type="text"
            name="title"
            required
            className="w-[270px] rounded-md bg-white shadow-md px-2 text-sm justify-between gap-x-2 item-start "
            value={title}
            onChange={({ val }) => setTitle(val)}
            // onBlur={async (e) => {
            //   const formData = new FormData();
            //   formData.append("title", e.target.value);
            //   formData.append("boardId", data.board_id);
            //   formData.append("id", data.id);
            //   formData.append("boardname", data.title);
            //   await handleSubmit(formData);
            // }}
          />
          <input hidden id="id" name="id" defaultValue={data.id} />
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.board_id}
          />
          <input
            hidden
            id="boardname"
            name="boardname"
            defaultValue={data.title}
          />
          <div className="flex flex-row item-start mt-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 text-sm"
            >
              Save
            </button>

            <button type="reset" onClick={disbaleEditing}>
              X
            </button>
          </div>
        </form>
      ) : (
        <div className="font-bold" onClick={enableEditing}>
          {data.title}
        </div>
      )}
    </div>
  );
}
