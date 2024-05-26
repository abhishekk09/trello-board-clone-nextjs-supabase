"use client";
import { supabase } from "../lib/supabaseClient";
import React, { useState, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
// import ModalCardDescription from "../components/ModalCardDescription";
// import { revalidatePath } from "next/cache";
// import { useRouter } from "next/router";
// import { updateDescription } from "../action/action";
import Link from "next/link";

export default function ShowTaskList({
  id,
  providedParent,
  params,
  refreshList,
  onCallBack,
}) {
  const [taskList, setTaskList] = useState([]);
  const [selectCardId, setSelectCardId] = useState("");
  const [selectCard, setSelectCard] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    let { data: taskList, error } = await supabase
      .from("task_card")
      .select("*")
      .eq("board_state_id", id);

    if (error) {
      console.error("Error fetching cards:", error);
    } else {
      setTaskList(taskList);
      // revalidatePath(`/board/${params.boardId}/${params.boardname}`, "page");
    }
  };
  useEffect(() => {
    // Call the async function
    fetchData();
  }, []);

  useEffect(() => {
    if (refreshList) {
      fetchData();
      onCallBack();
    }
  }, [refreshList]);

  const deleteTask = async (id) => {
    const { error } = await supabase.from("task_card").delete().eq("id", id);

    if (error) {
      console.error("Error fetching cards:", error);
    } else {
      const copiedArray = [...taskList];
      let index = copiedArray.findIndex((a) => a.id === id);
      copiedArray.splice(index, 1);
      setTaskList(copiedArray);
    }
  };

  return (
    <div>
      {taskList.map((bs, index) => (
        // <Draggable
        //   draggableId={String(bs.id)}
        //   index={index}
        //   key={String(index)}
        // >
        <Draggable
          key={bs.id.toString()}
          draggableId={bs.id.toString()}
          index={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={bs.id.toString()}
            >
              <div className="flex justify-between w-[270px] text-sm rounded-md bg-white shadow-md p-2 px-2  item-start mt-4">
                <Link href={`/modal/${bs.id}`}>
                  {/* <div onClick={() => openModal(bs)}>{bs.title}</div> */}
                  <div>{bs.title}</div>
                </Link>
                <button onClick={() => deleteTask(bs.id)}>Delete</button>
              </div>
              {bs.description && (
                <>
                  <p className="text-sm bg-red-100 rounded p-2">
                    Added Description
                  </p>
                </>
              )}
            </div>
          )}
        </Draggable>
      ))}
      {providedParent.placeholder}
    </div>
  );
}
